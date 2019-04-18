/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';

const countries = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
];

const options = countries.map(country => ({
  ...country,
  value: country.name, // This can be any ReactNode
  id: country.code,
}));

class CountrySelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      options,
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnRemoveTag = this.handleOnRemoveTag.bind(this);
  }

  createTag({ countryName, countryCode }) {
    return {
      id: countryCode, // When tag ids correspond to option ids, then MultiSelect will show only unselected options.
      label: `${countryName} (${countryCode || '?'})`,
    };
  }

  handleOnSelect(option) {
    console.log('onSelect(option): option=', option);
    const newTag = this.createTag({
      countryName: option.name,
      countryCode: option.code,
    });

    this.setState({ tags: [...this.state.tags, newTag] });
  }

  handleOnRemoveTag(tagId) {
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });
  }

  render() {
    return (
      <MultiSelect
        autoSizeInput
        mode="select"
        tags={this.state.tags}
        onSelect={this.handleOnSelect}
        onRemoveTag={this.handleOnRemoveTag}
        options={this.state.options}
        upgrade
      />
    );
  }
}

export default CountrySelection;
