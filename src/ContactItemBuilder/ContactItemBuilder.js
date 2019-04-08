import React from 'react';
import styles from './ContactItemBuilder.scss';
import Avatar from '../Avatar/Avatar';
import Text from '../Text';
import { dataHooks } from './ContactItemBuilderDataHooks';
import PropTypes from 'prop-types';

export const ContactItem = props => (
  <div className={styles.contactItemOption}>
    <div className={styles.avatar}>
      <Avatar
        name={props.title}
        size="size30"
        imgProps={{ src: props.imageUrl }}
        data-hook={dataHooks.pickerOptionAvatar}
      />
    </div>
    <div className={styles.contactItemTitles}>
      <Text
        ellipsis
        size="medium"
        weight="normal"
        secondary={!props.selected}
        light={props.selected}
        dataHook={dataHooks.pickerOptionTitle}
      >
        {props.title}
      </Text>
      {props.subtitle ? (
        <Text
          ellipsis
          size="small"
          weight="thin"
          secondary={!props.selected}
          light={props.selected}
          dataHook={dataHooks.pickerOptionSubtitle}
        >
          {props.subtitle}
        </Text>
      ) : null}
    </div>
  </div>
);

ContactItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  disabled: PropTypes.bool,
};

export const contactItemBuilder = ({
  id,
  title,
  subtitle,
  imageUrl,
  disabled,
}) => ({
  id,
  disabled,
  value: ({ selected }) => (
    <ContactItem
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      selected={selected}
    />
  ),
});
