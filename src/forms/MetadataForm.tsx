import { Formik, Field, Form } from "formik"

const MetadataForm = () => {
    const ipcRenderer = (window as any).electron.ipcRenderer

    const onFormSubmit = (e: any) => {
        console.log("onFormSubmit")
        ipcRenderer.send("submit:metadataForm", "form-submit")
    }

    return <>
        <h1>MetadataInfoForm</h1>

        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit("form-submit")
            }}>
            <Form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <Field type="password" name="password" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </>
}
export default MetadataForm