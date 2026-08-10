import * as SQLite from 'expo-sqlite';

export type AttendanceRecord = {
  id: number;
  studentId: string;
  eventId: string;
  eventTitle: string;
  scannedAt: string;
};

type RegisterResult = {
  success: boolean;
  message: string;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDatabase() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('attendance.db');
  }

  return dbPromise;
}

async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentId TEXT NOT NULL,
      eventId TEXT NOT NULL,
      eventTitle TEXT NOT NULL,
      scannedAt TEXT NOT NULL,
      UNIQUE(studentId, eventId)
    );
  `);

  return db;
}

export async function registerAttendance(
  qrData: string,
  studentId: string
): Promise<RegisterResult> {
  try {
    const db = await initializeDatabase();

    let qr: {
      v?: number;
      event?: string;
      title?: string;
      end?: string;
    };

    try {
      qr = JSON.parse(qrData);
    } catch {
      return {
        success: false,
        message: 'Invalid QR code.',
      };
    }

    if (qr.v !== 1 || !qr.event) {
      return {
        success: false,
        message: 'Invalid QR code.',
      };
    }

    if (qr.end) {
      const endTime = new Date(qr.end).getTime();

      if (!Number.isNaN(endTime) && endTime < Date.now()) {
        return {
          success: false,
          message: 'Event has already ended.',
        };
      }
    }

    const existing = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM attendance
       WHERE studentId = ? AND eventId = ?`,
      [studentId, qr.event]
    );

    if (existing) {
      return {
        success: false,
        message: 'Already registered.',
      };
    }

    await db.runAsync(
      `INSERT INTO attendance
       (studentId, eventId, eventTitle, scannedAt)
       VALUES (?, ?, ?, ?)`,
      [
        studentId,
        qr.event,
        qr.title ?? qr.event,
        new Date().toISOString(),
      ]
    );

    return {
      success: true,
      message: 'Attendance recorded!',
    };
  } catch (error) {
    console.error('Attendance registration failed:', error);

    return {
      success: false,
      message: 'Failed to record attendance.',
    };
  }
}

export async function getAttendanceHistory(
  studentId: string
): Promise<AttendanceRecord[]> {
  const db = await initializeDatabase();

  return db.getAllAsync<AttendanceRecord>(
    `SELECT
       id,
       studentId,
       eventId,
       eventTitle,
       scannedAt
     FROM attendance
     WHERE studentId = ?
     ORDER BY scannedAt DESC`,
    [studentId]
  );
}