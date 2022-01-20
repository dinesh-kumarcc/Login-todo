import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { Button, Card, Form, Checkbox } from 'semantic-ui-react';
import { useRouter } from 'next/router';


const Index = () => {
  const [form, setForm] = useState({ name: '', email: '',password:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  
  useEffect(() => {
    if (isSubmitting) {
        if (Object.keys(errors).length === 0) {
          createUser();
        }
        else {
            setIsSubmitting(false);
        }
    }
}, [errors])

const createUser = async () => {
  try {
      const res = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
      })
      console.log(form,'form')
      router.push("/new");
  } catch (error) {
      console.log(error);
  }
}
const validate = () => {
  let err = {};

  if (!form.name) {
      err.name = 'Name is required';
  }
  if (!form.email) {
      err.description = 'Email is required';
  }
  if (!form.password) {
    err.description = 'Password is required';
}
  return err;
}

// const handleSubmit = (e) => {
//   e.preventDefault();
//   let errs = validate();
//   setErrors(errs);
//   setIsSubmitting(true);
// }

const handleChange = (e) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value
  })
}
const handleSubmit = (e) => {
  e.preventDefault();
  let errs = validate();
  setErrors(errs);
  setIsSubmitting(true);
}

  return (
    <div className="notes-container">
      <h1>Regiser Here</h1>
      <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>
     
        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.name ? { content: 'Please enter a name', pointing: 'below' } : null}
                                label='Name'
                                placeholder='Name'
                                name='name'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Email'
                                placeholder='Email'
                                name='email'
                                error={errors.email ? { content: 'Please enter a email', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                              <Form.Input
                                fluid
                                label='Password'
                                placeholder='Password'
                                name='password'
                                error={errors.password ? { content: 'Please enter a password', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Register</Button>
                        </Form>
      </div>
    </div>
  )
}

export default Index;