import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { Button, Card, Form, Checkbox } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';

// http://localhost:3000/api/login/yyyyyy@gmail.com login api


// https://contactmentor.com/checkbox-list-react-js-example/
const Index = () => {
  const [form, setForm] = useState({email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => { 
    const userId = localStorage.getItem('userId');
    if(userId){
      router.push("/new");
    }
    if(!userId){
      router.push("/");
    }
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
    axios.post("http://localhost:3000/api/login", {
      email: form.email,
      password: form.password
    })
    .then(function (response) {
      // console.log(response,'>>',response.data.data._id);
      localStorage.setItem('userId',response.data.data._id)
      localStorage.setItem('loginUserData',JSON.stringify(response.data.data))
      router.push("/new");
    })
    .catch(function (error) {
      console.log(error);   
    });
  
  }
  const validate = () => {
    let err = {};

    if (!form.email) {
      err.description = 'Email is required';
    }
    if (!form.password) {
      err.description = 'Password is required';
    }
    return err;
  }

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
      <h1>Login</h1>
      <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>

        <Form onSubmit={handleSubmit}>
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
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    </div>
  )
}

export default Index;

















// import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';
// import { useState, useEffect } from 'react';
// import { Button, Card, Form, Checkbox } from 'semantic-ui-react';
// import { useRouter } from 'next/router';

// // http://localhost:3000/api/login/yyyyyy@gmail.com login api


// // https://contactmentor.com/checkbox-list-react-js-example/
// const Index = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   useEffect(() => {
//     if (isSubmitting) {
//       if (Object.keys(errors).length === 0) {
//         createUser();
//       }
//       else {
//         setIsSubmitting(false);
//       }
//     }
//   }, [errors])

//   const createUser = async () => {
//     try {
//       const res = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(form)
//       })
//       console.log(form, 'form')
//       router.push("/new");
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const validate = () => {
//     let err = {};

//     if (!form.name) {
//       err.name = 'Name is required';
//     }
//     if (!form.email) {
//       err.description = 'Email is required';
//     }
//     if (!form.password) {
//       err.description = 'Password is required';
//     }
//     return err;
//   }

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   let errs = validate();
//   //   setErrors(errs);
//   //   setIsSubmitting(true);
//   // }

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let errs = validate();
//     setErrors(errs);
//     setIsSubmitting(true);
//   }

//   return (
//     <div className="notes-container">
//       <h1>Regiser Page</h1>
//       <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>

//         <Form onSubmit={handleSubmit}>
//           <Form.Input
//             fluid
//             error={errors.name ? { content: 'Please enter a name', pointing: 'below' } : null}
//             label='Name'
//             placeholder='Name'
//             name='name'
//             onChange={handleChange}
//           />
//           <Form.Input
//             fluid
//             label='Email'
//             placeholder='Email'
//             name='email'
//             error={errors.email ? { content: 'Please enter a email', pointing: 'below' } : null}
//             onChange={handleChange}
//           />
//           <Form.Input
//             fluid
//             label='Password'
//             placeholder='Password'
//             name='password'
//             error={errors.password ? { content: 'Please enter a password', pointing: 'below' } : null}
//             onChange={handleChange}
//           />
//           <Button type='submit'>Register</Button>
//         </Form>
//       </div>

//       {/* <div className="grid wrapper">
//         {notes.map(note => {
//           return (
//             <div key={note._id}>
//               <Card>
//                 <Card.Content>
//                   <Card.Header>
//                     <Link href={`/${note._id}`}>
//                       <a>{note.title}</a>
//                     </Link>
//                   </Card.Header>
//                 </Card.Content>
//                 <Card.Content extra>
//                   <Link href={`/${note._id}`}>
//                     <Button primary>View</Button>
//                   </Link>
//                   <Link href={`/${note._id}/edit`}>
//                     <Button primary>Edit</Button>
//                   </Link>
//                 </Card.Content>
//               </Card>
//             </div>
//           )
//         })}
//       </div> */}
//       {/* <Form>
//           <Form.Field>
//             <label>Name</label>
//             <input placeholder='First Name' />
//           </Form.Field>
//           <Form.Field>
//             <label>Email</label>
//             <input placeholder='Last Name' />
//           </Form.Field>
//           <Form.Field>
//             <label>Password</label>
//             <input placeholder='Last Name' />
//           </Form.Field>
//           <Form.Field>
//             <Checkbox label='I agree to the Terms and Conditions' />
//           </Form.Field>
//           <Button type='submit'>Submit</Button>
//         </Form> */}
//     </div>
//   )
// }

// export default Index;