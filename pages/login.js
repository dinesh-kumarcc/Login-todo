
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Checkbox } from 'semantic-ui-react';
// import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Login = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>N</h1>
      <div>
      

      </div>
      {/* <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div> */}
     
      {/* <div className="grid wrapper">
        {notes.map(note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

// getInitialProps from next.js function that would allow us to runs some code before the actuall component render out the page

// so this will we run server side 

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data }
}

export default Login;