import dbConnect from '../../../utils/dbConnect';
import Register from '../../../models/Register';


dbConnect();
export default async (req, res) => {
    console.log('----------------------',req,'..............',req.body)
    const {
        body : { email },
        method
    } = req;

    switch (method) {
        case 'POST':
            try {
                const note = await Register.findOne({email});
                console.log(note._id,'}}}}}}}',typeof(note.email),'}}}}}}}}}}}}',note.password)
                // if (!note) {
                //     return res.status(400).json({ success: false,data:note });
                // }

                if(req.body.email == note.email && req.body.password == note.password){
                    res.status(200).json({ success: 200 ,data:note});
                }else{
                    console.log('++++++++++++++==')
                    res.status(400).json({ success: 400 ,message:"email password doesnot match"});
                }
            } catch (error) {
                console.log('===========')
                res.status(400).json({ success: 400 });
            }
            break;  
      
        default:
            res.status(400).json({ success: false })
            break;
    }
}

















// import dbConnect from '../../../utils/dbConnect';
// import Register from '../../../models/Register';


// dbConnect();
// export default async (req, res) => {
//     console.log('----------------------',req.query.id,'..............',req.body)
//     // const mail = req;
//     // console.log('mail<<<<<<<<<<<<<<<',mail,'mail<<<<<<<<<<<<<<<')
//     const {
//         query: { id },
//         method
//     } = req;

//     switch (method) {
//         case 'GET':
//             try {
//                 const note = await Register.findOne({email:id});
//                 console.log(note.email,'}}}}}}}}}}}}}}}}}}}',note.password)
//                 if (!note) {
//                     return res.status(400).json({ success: false,data:note });
//                 }

//                 if(req.body.email == note.email && req.body.password == note.password){
//                     res.status(200).json({ success: true ,data:note});
//                 }else{
//                     res.status(400).json({ success: true ,message:"email password doesnot match"});
//                 }
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;  
      
//         default:
//             res.status(400).json({ success: false })
//             break;
//     }
// }


// // const handleSubmit= (e)=>{
// //     e.preventDefault()
   
// //     axios.post(url, {   
// //         email: data.email,
// //         password: data.password
// //     })
// //     .then(res => {
// //         if (res.status==200)
// //         {
// //             console.log(res);
// //             localStorage.setItem('token', res['data'].accesstoken);
// //             localStorage.setItem('email', res['data'].email)
// //             let path = "/Record";
// //             history.push(path);
// //         }
        
// //     })
// // }