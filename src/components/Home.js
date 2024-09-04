import { useEffect, useState } from "react"
import axios from "axios"
import Header from "./Header"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Link, useNavigate} from "react-router-dom"

import "./Home.css"
function Home(){

    const [data, setData] = useState([])
    const navigate = useNavigate()
    const idAdd = '-1'
    const [detailData, setDetailData] = useState({})

    useEffect(() => {
        axios.get("http://localhost:3000/employees")
            .then(res => setData(res.data))
            .catch(err => console.log(err)
            )
    })

    function handleDelete(id){
        const confirm = window.confirm(`Bạn có thực sự muốn xóa nhân viên có mã = ${id} ??`)
        if(confirm){
            axios.delete('http://localhost:3000/employees/' + id)
            .then(res => {
                alert('Xóa thành công!');
                axios.get('http://localhost:3000/employees/')
                    .then(res => setData(res.data))
            })
        }
    }

    return (
        <div className="container mt-5">
            <h2>Quản lý nhân viên với ReactJS Axios</h2>
            <Link to={`/update/${idAdd}`} className="btn btn-primary">Thêm mới nhân viên</Link>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Họ Tên</td>
                        <td>Tuổi</td>
                        <td>Lương</td>
                        <td>Địa chỉ</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => {
                       return ( <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.age}</td>
                        <td>{data.salary}</td>
                        <td>{data.address}</td>
                        <td>
                            <Link to={`/update/${data.id}`} className="btn btn-warning">Cập nhật</Link>
                            <button onClick={e => handleDelete(data.id)} className="btn btn-danger mx-2">Xóa</button>
                        </td>
                    </tr>)
                    })}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleLabelModal" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-success" id="exampleLabelModal">Chi tiết nhân viên</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <table className="detail table table-striped table-hover">
                                <tr>
                                    <td className="title">ID:</td>
                                    <td >{detailData.id}</td>
                                </tr>
                                <tr>
                                    <td className="title">Họ tên:</td>
                                    <td >{detailData.name}</td>
                                </tr>
                                <tr>
                                    <td className="title">Tuổi:</td>
                                    <td >{detailData.age}</td>
                                </tr>
                                <tr>
                                    <td className="title">Lương:</td>
                                    <td >{detailData.salary}</td>
                                </tr>
                                <tr>
                                    <td className="title">Địa chỉ:</td>
                                    <td >{detailData.address}</td>
                                </tr>
                            </table>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home