import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IconName = ComponentProps<typeof FontAwesome>['name'];

type Props = {
  title: string;
  theme?: 'primary';
  icon?: IconName;
  onPress?: () => void | Promise<void>;
};

export default function AppButton({
  title,
  theme,
  icon,
  onPress,
}: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            borderColor: '#ffd33d',
            borderRadius: 18,
          },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => onPress?.()}
        >
          {icon && (
            <FontAwesome
              name={icon}
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
          )}

          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
            {title}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => onPress?.()}
      >
        {icon && (
          <FontAwesome
            name={icon}
            size={18}
            color="#fff"
            style={styles.buttonIcon}
          />
        )}

        <Text style={styles.buttonLabel}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonIcon: {
    paddingRight: 8,
  },

  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});