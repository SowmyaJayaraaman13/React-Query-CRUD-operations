import { db } from '../../Firebase/firebase'

export default async function helper(req, res) {
    if(req.method == 'GET'){
        if(req.url.split('/api/helper/').length == 2){
            const id = req.url.split('/api/helper/')[1]
            await db.collection('userList').doc(id).get().then(querySnapshot => {
                res.status(200).json({ response: querySnapshot.data() }) 
            })
        }
        else{
            await db.collection('userList').get().then(querySnapshot => {
                var data = []
                querySnapshot.docs.forEach(item => data.push({...item.data(), id: item.id}))
                res.status(200).json({ response: data })
            })
        }
        
    }
    if(req.method == 'POST'){
        await db.collection('userList').add(req.body).then(response => {
            res.status(200).json({ response: 'User Added Successfully' })
        })
    }
    if(req.method == 'DELETE'){
        const id = req.url.split('/api/helper/')[1]
        await db.collection('userList').doc(id).delete().then(response => {
            res.status(200).json({ response: 'User Deleted Successfully' })
        })
    }

    if(req.method == 'PUT'){
        const id = req.url.split('/api/helper/')[1]
        // const id = req.url.split('/').pop()
        await db.collection('userList').doc(id).set(req.body).then(response => {
            res.status(200).json({ response: 'User Updated Successfully' })
        })
    }

    return 
  }