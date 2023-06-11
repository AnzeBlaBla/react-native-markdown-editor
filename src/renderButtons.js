import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

import defaultFormats from './defaultFormats';

const FOREGROUND_COLOR = 'rgba(82, 194, 175, 1)';
const defaultStyles = { padding: 8, color: FOREGROUND_COLOR, fontSize: 16 };

const defaultMarkdownButton = ({ item, ...drill }) => {
  return (
    <TouchableOpacity onPress={() => item.onPress({ item, ...drill })}>
      <Text style={[defaultStyles, item.style]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export const renderFormatButtons = (drill, formats, markdownButton) => {
  const list = (
    <FlatList
      data={formats ? formats : defaultFormats}
      keyboardShouldPersistTaps="always"
      renderItem={({ item, index }) =>
        markdownButton
          ? markdownButton({ item, ...drill })
          : defaultMarkdownButton({ item, ...drill })}
      horizontal
    />
  );
  return list;
};
