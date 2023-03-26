import React from 'react';
import Form from 'react-bootstrap/Form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import styles from '../styles/GeneratorSettings.module.css';
import { Settings } from '../types/Settings';

type Props = {
    register: UseFormRegister<Settings>;
    errors: FieldErrors<Settings>;
};

const GeneratorSettings = ({ register, errors }: Props): JSX.Element => {
    return (
        <Form className={styles['settings']}>
            <div className={styles['settings-column']}>
                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Min</Form.Label>
                        <Form.Control className={styles['input']} type='number' {...register('min', {
                            required: 'Please enter a valid number',
                        })} />
                        <Form.Text className={styles['error']}>
                            {errors.min?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Max</Form.Label>
                        <Form.Control className={styles['input']} type='number' {...register('max', {
                            required: 'Please enter a valid number',
                        })} />
                        <Form.Text className={styles['error']}>
                            {errors.max?.message}
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Score holder</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('scoreHolder', {
                            required: 'Please enter a valid value',
                        })} />
                        <Form.Text className={styles['error']}>
                            {errors.scoreHolder?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Objective</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('objective', {
                            required: 'Please enter a valid value',
                        })} />
                        <Form.Text className={styles['error']}>
                            {errors.objective?.message}
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Namespace</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('namespace')} />
                    </Form.Group>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Path</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('path')} />
                    </Form.Group>
                </div>
            </div>

            <div className={styles['settings-column']}>
                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Output commands</Form.Label>
                        <Form.Control className={styles['input']} as='textarea' {...register('commands', {
                            required: 'Please enter a valid value',
                        })} />
                        <Form.Text className={styles['error']}>
                            {errors.commands?.message}
                        </Form.Text>
                    </Form.Group>
                </div>
                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Check type='switch' label='Use IMP-Doc' {...register('useImpDoc')} />
                    </Form.Group>
                </div>
            </div>
        </Form>
    );
};

export default GeneratorSettings;
