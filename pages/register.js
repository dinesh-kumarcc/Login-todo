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
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //     router.push("/");
    // }
    // // if (userId) {
    // //     router.push("/new");
    // // }
}, [errors])

const createUser = async () => {
  try {
      const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
      })
      const data = await res.json();
      console.log(data,'register data')
      console.log(form,'form')
      if(data.success == 201){
        alert('Register Successfully')
        router.push("/");
      }
      if(data.success == 400){
        alert('Already Register')
        // router.push("/");
      }
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
  createUser();
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















 // if (isSubmitting) {
    //     if (Object.keys(errors).length === 0) {
    //       createUser();
    //     }
    //     else {
    //         setIsSubmitting(false);
    //     }
    // }