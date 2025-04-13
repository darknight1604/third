import {Button, Text, useTheme} from 'react-native-paper';

interface ISubmitButtonProps {
  label: string;
  onSubmit: () => void;
}

const SubmitButton = ({label, onSubmit}: ISubmitButtonProps) => {
  const {roundness, colors} = useTheme();
  return (
    <Button
      onPress={onSubmit}
      style={{
        backgroundColor: colors.primary,
        borderRadius: roundness,
      }}>
      <Text style={{color: colors.onPrimary}}>{label}</Text>
    </Button>
  );
};

export default SubmitButton;
