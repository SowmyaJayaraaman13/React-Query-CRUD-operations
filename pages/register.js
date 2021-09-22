import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { postUserList, getUserById, updateUserById } from '../src/query/query'
import { useRouter } from 'next/router'


function Register() {
    const router = useRouter()
    const docId = router.query.id
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const { mutateAsync } = useMutation(postUserList, {
        onSuccess: () => {
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);
        }
    })

    const { mutateAsync: updateMutateAsync } = useMutation(updateUserById, {
        onSuccess: () => {
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000);

        }
    })

    const { data } = useQuery(["userList", { id: docId }], getUserById, {
        onSuccess: () => {
        }
    })


    useEffect(() => {
        if (data) {
            setFormValue({
                name: data.response.name,
                email: data.response.email,
                phone: data.response.phone,
                gender: data.response.gender
            })
        }
    }, [docId, data])

    const initialState = {
        name: '',
        email: '',
        phone: '',
        gender: 'Male'
    }
    const [formValue, setFormValue] = useState(initialState)
    const handleFormValue = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        await mutateAsync(formValue)
        setFormValue(initialState)
    }

    const updateHandler = async (event) => {
        event.preventDefault()
        await updateMutateAsync({
            id: docId,
            body: formValue
        })
        setFormValue(initialState)
        router.push('user_list')
    }


    return (
        <form className='form_wrapper'>
            <div className='form_field'>
                <label >Name</label>
                <input type="text" name="name" onChange={handleFormValue} value={formValue.name} required />
            </div>
            <div className='form_field'>
                <label>Email</label>
                <input type="email" name="email" onChange={handleFormValue} value={formValue.email} required />
            </div>
            <div className='form_field'>
                <label>Phone</label>
                <input type="number" name="phone" onChange={handleFormValue} value={formValue.phone} required />
            </div>
            <div className='form_field'>
                <label>Gender</label>
                <select name='gender' onChange={handleFormValue} value={formValue.gender}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
            </div>
            {
                data == undefined ? <button onClick={submitHandler}>Submit</button> : <button onClick={updateHandler}>Update</button>
            }
            {
                showSuccessMessage &&
                <h4>Data Saved Successfully</h4>  
            }

        </form>
    )
}

export default Register
