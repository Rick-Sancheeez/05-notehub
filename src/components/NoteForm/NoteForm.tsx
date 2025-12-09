import css from './NoteForm.module.css'


import { Formik, Form, Field, ErrorMessage } from 'formik'
//import type {FormikHelpers} from 'formik'
import * as Yup from 'yup'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import {createNote} from '../../services/noteService'

const Schema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(3, 'Title is too short').max(50, 'Title is too long'),
    content: Yup.string().max(500, 'Content must be under 500 symbols'),
    tag: Yup.string().required('Choose a category').oneOf(['Todo', 'Personal', 'Work', 'Meeting', 'Shopping']),
});

interface NoteFormValues {
    title: string;
    content: string;
    tag: string;
};

const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: '',
};

interface NoteFormProps {
    onClose: () => void;
    currentPage: number;
    query: string;
};

export default function NoteForm({onClose, currentPage, query}: NoteFormProps) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (note: NoteFormValues) => createNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["note", currentPage, query] });
            onClose(); 
        }
    });

    const handleSubmit = (
        values: NoteFormValues,
    ) => {
        mutation.mutate(values);
    };

    return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Schema}> 
    <Form className={css.form}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as='textarea'
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            />
            <ErrorMessage name="content" className={css.error} component='span'/>
        </div>

        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as='select' id="tag" name="tag" className={css.select}>
                <option value="">Select category...</option>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name='tag' className={css.error} component='span' />
            
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
            //disabled=false
            >
            Create note
            </button>
        </div>
    </Form>
    </Formik>

    );
}