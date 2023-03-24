import React from 'react';
import Form from 'react-bootstrap/Form';
import { UseFormRegister } from 'react-hook-form';

import styles from '../styles/GeneratorSettings.module.css';
import { Settings } from '../types/Settings';

type Props = {
    register: UseFormRegister<Settings>;
};

const GeneratorSettings = ({ register }: Props): JSX.Element => {
    return (
        <Form className={styles['settings']}>
            <div className={styles['settings-column']}>
                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Min</Form.Label>
                        <Form.Control className={styles['input']} type='number' {...register('min')} />
                    </Form.Group>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Max</Form.Label>
                        <Form.Control className={styles['input']} type='number' {...register('max')} />
                    </Form.Group>
                </div>

                <div className={styles['item-group']}>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Score holder</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('scoreHolder')} />
                    </Form.Group>
                    <Form.Group className={styles['item']}>
                        <Form.Label>Objective</Form.Label>
                        <Form.Control className={styles['input']} type='text' {...register('objective')} />
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
                        <Form.Control className={styles['input']} as='textarea' {...register('commands')} />
                    </Form.Group>
                </div>
            </div>
        </Form>
    );
};

export default GeneratorSettings;
