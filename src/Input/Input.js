import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useThemeContext} from '../util/ThemeProvider';
import {radii, shadows, sizes} from '../util/prop-types';

const getContainerStyle = ({
  theme,
  round,
  outline,
  outlineColor,
  error,
  background,
  radius,
  shadow,
}) => {
  const inputContainerStyle = [styles.container];
  inputContainerStyle.push({
    borderBottomColor: theme.colors[outlineColor],
    borderRadius: theme.radius[radius],
    ...theme.shadow[shadow],
  });
  if (outline) {
    inputContainerStyle.push({
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors[outlineColor],
      borderBottomColor: theme.colors[outlineColor],
      backgroundColor: theme.colors[background],
    });
  }
  if (round) {
    inputContainerStyle.push({
      borderBottomWidth: 0,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors[background],
    });
  }
  if (outline && round) {
    inputContainerStyle.push({
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors[outlineColor],
      borderBottomColor: theme.colors[outlineColor],
      backgroundColor: theme.colors[background],
    });
  }
  if (error) {
    inputContainerStyle.push({
      borderColor: '#ff000080',
      borderBottomColor: '#ff000080',
      backgroundColor: '#ff000005',
    });
  }
  return inputContainerStyle;
};

const getInputStyle = ({theme, size, textColor, textAlign, textStyle}) => {
  const inputStyle = [styles.input];
  inputStyle.push({
    fontSize: theme.fontSize[size],
    color: theme.colors[textColor],
    marginVertical: 0,
    textAlign,
  });
  return inputStyle;
};

const getLabelStyle = ({theme, size, labelColor}) => {
  const labelStyle = [
    {
      fontSize: theme.fontSize[size],
      fontWeight: 'bold',
      paddingLeft: 2.5,
      paddingBottom: 5,
      color: theme.colors[labelColor],
    },
  ];
  return labelStyle;
};

const getLabelHintStyle = ({theme, size, labelHintColor}) => {
  const labelHintStyle = [
    {
      fontSize: theme.fontSize[size] * 0.9,
      fontStyle: 'italic',
      paddingLeft: 2.5,
      paddingBottom: 8,
      color: theme.colors[labelHintColor],
    },
  ];
  return labelHintStyle;
};

const getCaptionStyle = ({theme, size}) => {
  const caption = [
    {
      fontSize: theme.fontSize[size] * 0.8,
      fontWeight: '600',
      paddingLeft: 5,
      paddingTop: 5,
      color: '#ff000080',
    },
  ];
  return caption;
};

const Input = React.forwardRef((props, ref) => {
  const theme = useThemeContext();
  const showLabel = props.floatingLabel ? props.value.length > 0 : props.label;
  const showLabelHint = showLabel && props.labelHint;
  const {
    style,
    textStyle,
    labelStyle,
    label,
    labelHintStyle,
    labelHint,
    leftIcon,
    rightIcon,
    floatingLabel,
    multiline,
    placeholder,
    disabled,
    error,
    errorCaption,
    ...otherProps
  } = props;
  return (
    <View style={props.containerStyle}>
      {showLabel ? (
        typeof props.label !== 'function' ? (
          <Text
            style={StyleSheet.flatten([
              getLabelStyle({...props, theme}),
              labelStyle,
            ])}>
            {label}
          </Text>
        ) : (
          label
        )
      ) : null}
      {showLabelHint ? (
        typeof labelHint !== 'function' ? (
          <Text
            style={StyleSheet.flatten([
              getLabelHintStyle({...props, theme}),
              labelHintStyle,
            ])}>
            {labelHint}
          </Text>
        ) : (
          labelHint
        )
      ) : null}
      <View
        style={StyleSheet.flatten([
          getContainerStyle({...props, theme}),
          style,
        ])}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          editable={!disabled}
          textAlignVertical={multiline ? 'top' : 'center'}
          placeholderTextColor={theme.colors.subtle}
          placeholder={floatingLabel ? label : placeholder}
          multiline={multiline}
          {...otherProps}
          style={[getInputStyle({...otherProps, theme}), textStyle]}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && errorCaption ? (
        typeof errorCaption !== 'function' ? (
          <Text
            style={StyleSheet.flatten([
              getCaptionStyle({...props, theme}),
              labelStyle,
            ])}>
            {errorCaption}
          </Text>
        ) : (
          errorCaption
        )
      ) : null}
    </View>
  );
});

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textColor: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  floatingLabel: PropTypes.bool,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelHintStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelColor: PropTypes.string,
  labelHintColor: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelHint: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.string,
  outlineColor: PropTypes.string,
  round: PropTypes.bool,
  outline: PropTypes.bool,
  error: PropTypes.bool,
  errorCaption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  size: sizes,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  background: PropTypes.string,
  shadow: shadows,
  radius: radii,
};

Input.defaultProps = {
  placeholder: 'Type here',
  textColor: 'para',
  color: 'subtle',
  size: 'md',
  labelColor: 'subtle',
  background: 'bgInput',
  outlineColor: 'outline',
  floatingLabel: false,
  textAlign: 'left',
  shadow: 'none',
  radius: 'sm',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  leftIcon: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
