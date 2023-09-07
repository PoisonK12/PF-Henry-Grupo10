import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions';


const AllUser = () => {

  const allUsers = useSelector(state => state.users);
  console.log('usuarios', allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">FullName</th>
            <th scope="col">Adress</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Nationality</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((ele, index) =>
              <tr key={ele.id}>
                <th scope="row">{index}</th>
                <td><img src={ele.profilePic} alt="" style={{width: "35px", height: "35px", borderRadius: "100%"}}/></td>
                <td>{ele.userName}</td>
                <td>{ele.address}</td>
                <td>{ele.email}</td>
                <td>{ele.phoneNumber}</td>
                <td>{ele.nationality}</td>
                <td>{ele.userType}</td>
                <td>⭐⭐⭐</td>
              </tr>
              )
          }
        </tbody>
      </table>
    </div>
  );
};
export default AllUser;
