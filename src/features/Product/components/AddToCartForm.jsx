import React from 'react';
import PropTypes from 'prop-types';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from '../../../components/Form-controls/QuantityField';

const AddToCartForm = ({ onSubmit = null }) => {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Số lượng lớn hơn 1')
      .required('Nhập số lượng')
      .typeError('Hãy nhập số'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (onSubmit) {
      onSubmit(value);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Số lượng" form={form} />
      <Button type="sumbit" variant="contained" fullWidth color="primary">
        Thêm vào giỏ hàng
      </Button>
    </form>
  );
};

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddToCartForm;
