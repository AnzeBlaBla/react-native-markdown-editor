import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';

import { renderFormatButtons } from './renderButtons';

const FOREGROUND_COLOR = 'rgba(82, 194, 175, 1)';
const styles = StyleSheet.create({
  composeText: {
    borderColor: FOREGROUND_COLOR,
    borderWidth: 1,
    flexDirection: 'column',
    flex: 1,
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
  },
  inlinePadding: {
    padding: 8,
  },
  preview: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: FOREGROUND_COLOR,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: '#555555',
  },
};

const WrapperView = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

export default function MarkdownEditor({
  defaultText,
  defaultShowPreview = false,
  onMarkdownChange,
  defaultPreviewText = 'Markdown preview here',
  placeholder = 'Write a long message',
  formats,
  markdownButton,
  focusOnMount = true,
}) {

  const [text, setTextState] = React.useState(defaultText || '');
  const [selection, setSelectionState] = React.useState({ start: 0, end: 0 });
  const [displaySelection, setDisplaySelection] = useState(false);
  const [showPreview, setShowPreview] = React.useState(defaultShowPreview ? defaultShowPreview : false);
  const textInput = useRef(null);

  useEffect(() => {
    if (textInput.current && focusOnMount) {
      textInput.current.focus();
    }
  }, [textInput]);

  const togglePreview = () => {
    setShowPreview(old => !old);
  }

  const onChangeText = (text) => {
    setText(text);
  }
  const onSelectionChange = (selection) => {
    setSelectionState(selection.nativeEvent.selection);
  }

  const setSelection = (start, end) => {
    if (!end)
      end = start;
    setSelectionState({ start, end });
    setDisplaySelection(true);
  }
  const setText = (text) => {
    setTextState(text);
    if (onMarkdownChange) {
      onMarkdownChange(text);
    }
  }

  // Auto toggle selection back (this will let the user change it again, otherwise it's buggy)
  useEffect(() => {
    if (displaySelection)
      setDisplaySelection(false);
  }, [displaySelection]);

  return (
    <WrapperView behavior="padding" style={styles.screen}>
      {showPreview ? (
        <View style={styles.preview}>
          <ScrollView removeClippedSubviews nestedScrollEnabled={true}>
            <MarkdownView styles={markdownStyles}>
              {text === '' ? defaultPreviewText : text}
            </MarkdownView>
          </ScrollView>
        </View>
      ) : (
        <TextInput
          style={styles.composeText}
          multiline
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          onSelectionChange={onSelectionChange}
          value={text}
          placeholder={placeholder}
          ref={textInput}
          selection={displaySelection ? selection : null}
          textAlignVertical="top"
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={togglePreview}
          style={{ padding: 8, borderRightWidth: 1, borderColor: FOREGROUND_COLOR }}>
          <Image
            style={[styles.button, { tintColor: showPreview ? "#000" : FOREGROUND_COLOR, padding: 8 }]}
            source={require('../static/visibility.png')}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        {renderFormatButtons(
          {
            getState: () => ({
              text,
              selection,
            }),
            setSelection,
            setText
          },
          formats,
          markdownButton,
        )}
      </View>
    </WrapperView>
  );
}
