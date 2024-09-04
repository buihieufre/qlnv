import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

function AddUpdate() {

    const {id} = useParams();
    const [inputData, setInputData] = useState({
        name:'',
        age:'',
        address:'',
        salary:''
    })
    const navigate = useNavigate();
    useEffect(() => {
        if(id!== '-1'){
            axios.get("http://localhost:3000/employees/" + id)
            .then(res =>setInputData(res.data))
            .catch(err => console.log(err)
            )
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(id !== '-1'){
            axios.put("http://localhost:3000/employees/" + id, inputData)
            .then(res =>{alert("cap nhat thanh cong")
                    navigate('/')
            })
        }else {
            axios.post("http://localhost:3000/employees/", inputData)
            .then(res =>{alert("Them moi thanh cong")
                    navigate('/')
            })
        }
    }

    

    return (
        <div className="d-flex justify-conten-center">
            <div className="form-add container m-5 p-5 w-50">
                <h2>{id !== "-1" ? "Thêm mới" : "Cập nhật"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Họ tên: </label>
                        <input name="name" type="text" className="form-control"
                        value={inputData.name}
                        onChange={e=> {setInputData({...inputData, name: e.target.value})}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Tuổi: </label>
                        <input name="age" type="text" className="form-control"
                        value={inputData.age}
                        onChange={e=> {setInputData({...inputData, age: e.target.value})}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Lương: </label>
                        <input name="salary" type="text" className="form-control"
                        value={inputData.salary}
                        onChange={e=> {setInputData({...inputData, salary: e.target.value})}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ: </label>
                        <input name="address" type="text" className="form-control"
                        value={inputData.address}
                        onChange={e=> {setInputData({...inputData, address: e.target.value})}}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to= "/" type="reset" className="btn btn-warning">Hủy</Link>
                </form>
            </div>
        </div>
    )
}

export default AddUpdate