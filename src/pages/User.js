// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../services/userService";
import { getUser, addUser, editUser, deleteUser } from "../store/userSlice";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [users, setUsers] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    // console.log("1");

    const response = await getUsers();
    dispatch(getUser(response));
    setUsers(response);

    // await dispatch(fetchUsers());
    // console.log(user.loading);
    // console.log(user.error);
    // console.log(user.data);

    // console.log("2");
  };

  // ! Ekleme sonrası çalışıcak
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    console.log("Add");
    if (name && surname) {
      dispatch(addUser({ name, surname }));

      setName("");
      setSurname("");
      setIsAdd(false);
    } else {
      alert("Boş bırakmayınız.");
    }
  };

  // ! Düzenlenecek kişi bilgileri
  const handleEdit = (index, name, surname) => {
    setId(index);
    setName(name);
    setSurname(surname);
    setIsAdd(false);
  };

  // ! Düzenleme sonrası çalışıcak
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log("Edit");
    dispatch(editUser({ id, name, surname }));
    setId("");
    setName("");
    setSurname("");
  };

  const handleDelete = (id) => {
    console.log("Slindi");
    dispatch(deleteUser({ id }));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", columnGap: "64px" }}>
        <h1>Kullanıcılar</h1>
        <button
          type="button"
          onClick={() => {
            setIsAdd(true);
            setId("");
            setName("");
            setSurname("");
          }}
        >
          Yeni Ekle
        </button>
      </div>
      {user.loading && "Loading..."}
      {user.error && user.error}
      {users.map((user) => {
        return (
          <div key={user.id} style={{ display: "flex", alignItems: "center", columnGap: "32px" }}>
            <h3>{user.name + " " + user.surname}</h3>
            <button
              type="button"
              onClick={() => {
                handleEdit(user.id, user.name, user.surname);
              }}
            >
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              Sil
            </button>
          </div>
        );
      })}
      <div style={{ marginTop: "32px", display: `${isAdd || name ? "block" : "none"}` }}>
        <form onSubmit={isAdd ? handleSubmitAdd : handleSubmitEdit} style={{ display: "flex", alignItems: "center", columnGap: "16px" }}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <button type="submit">{isAdd ? "Yeni Ekle" : "Düzenle"}</button>
        </form>
      </div>
    </div>
  );
}

export default User;
