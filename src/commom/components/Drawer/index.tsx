import React, { useState, Component } from 'react'
import { Formik, FormikProps, FormikHelpers, yupToFormErrors } from "formik";
import useMutationCreateClient from "../../../Features/Clients/hooks/useMutationCreateClient"
import useMutationUpdateClient from "../../../Features/Clients/hooks/useMutationUpdateClient"
import { Drawer, Button } from 'antd';
import FormClients from '../../../Features/Clients/components/form';
import { Mutation } from "react-apollo";
import { CREATE_CLIENT } from '../../../Features/queries/clients'
import Yup from '../../../validations'

interface Props {
    title: string,
    visible: any,
    setVisible: any,
    editData: any,
    setEditData: any,
}
interface Form {
    id: any
    name: string
    age: string
    address: string
    telephone: string
    type: string
}

const GenericDrawer = ({ title, visible, setVisible, editData, setEditData }: Props) => {
    const { createClient } = useMutationCreateClient()
    const { updateClient } = useMutationUpdateClient()

function submit(values: Form, helper: FormikHelpers<Form>) {
    editData ? updateClient(values) : createClient(values)
    setVisible(false)
    setEditData(null)
    helper.resetForm()
  }

    function cancel(props: FormikHelpers<Form>) {
        setVisible(false)
        props.resetForm()
    }

    return (
        <>
            <Drawer
                title={title}
                width={520}
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                <Mutation
                mutation={CREATE_CLIENT}
                >

                {(addClient:any, { data, loading, error }:any) => {
                return (
                <Formik
                    initialValues={{ id: undefined, name: "", age: "", address: "", telephone: "", type:"" }}
                    validationSchema={schema}
                    onSubmit={(values, helper) => { console.log("value", values); return submit(values, helper) }}
                    onReset={(values, helper) => { cancel(helper) }}>
                    {(props: FormikProps<Form>) => <FormClients formikProps={props} editData={editData} />}
                </Formik>)}}
                </Mutation>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    
                </div>
            </Drawer>
        </>
    )
}

export default GenericDrawer

const schema = Yup.object({
    name: Yup.string()
        .required(),
    age: Yup.string()
        .required(),
    address: Yup.string()
        .required(),
    telephone: Yup.string()
        .required(),
});