import dbConnect from '../../../utils/dbConnect';
import Register from '../../../models/Register';


dbConnect();

export default async (req, res) => {
    const {
        body: { email },
        method
    } = req;
    console.log(req.body,'{{{{{{{{{{{{{{{{{',email,'}}}}}}}}}}}}}}}}')

    switch (method) {
        case 'GET':
            try { 

                const resgiter = await Register.find({});

                res.status(200).json({ success: true, data: resgiter })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                
                const note = await Register.findOne({email:email});
                console.log(note,'&&&&&&&&&&&&&&&&&&&&&&&&&&')

                if(note == null){
                    console.log('*******')
                   
                    const resgiter = await Register.create(req.body);
    
                    res.status(201).json({ success: true, data: resgiter })
                }else{
                    console.log('%%%%%%%%%%%%%%')
                    res.status(400).json({ success: true ,message:"email password exist"});
                   
                }

                
            } catch (error) {
                res.status(400).json({ success: false});
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

