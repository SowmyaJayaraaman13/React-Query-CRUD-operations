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
            const page = +(req.query.page)
            // const lastId = req.query.docId
            const total_pages = await (await db.collection('userList').get()).size
            console.log(total_pages, page)
            const limit_value = page * 4
            // if (lastId != 0){
            //     console.log("Inside If")
            //     const docRef = db.collection('userList').doc(lastId);
            //     const snapshot = await docRef.get();
            //     await db.collection('userList').startAfter(snapshot).limit(limit_value).get().then(querySnapshot => {
            //         var data = []
            //         querySnapshot.docs.forEach(item => data.push({...item.data(), id: item.id }))
            //         res.status(200).json({ response: data, page, total_pages: Math.ceil(total_pages/4) })
            //     })
            //     return
            // }
            await db.collection('userList').limit(limit_value).get().then(querySnapshot => {
                var data = []
                querySnapshot.docs.forEach(item => data.push({...item.data(), id: item.id }))
                res.status(200).json({ response: data, page, total_pages: Math.ceil(total_pages/4) })
            })
            return
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