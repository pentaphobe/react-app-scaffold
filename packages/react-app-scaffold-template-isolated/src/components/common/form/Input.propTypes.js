import PropTypes from 'prop-types';

const InputWithLabelChildProps = {
  id: PropTypes.string.isRequired,
  children: PropTypes.array
};

const InputWithLabelAttributeProps = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export {
  InputWithLabelChildProps,
  InputWithLabelAttributeProps
};