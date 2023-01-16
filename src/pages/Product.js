import React, { useState } from "react";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from "../store/productSlice";

function Product() {
  const [id, setId] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  const { data: products, isLoading, isFetching, isSuccess, isError, error } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const columns = [
    { field: "name", headerName: "Ürün Adı", width: 200 },
    { field: "price", headerName: "Ürün Fiyatı", width: 200 },
    {
      field: "actions",
      headerName: "Eylemler",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Stack spacing={2} direction="row">
            <IconButton
              onClick={() => {
                handleEdit(cellValues.row.id, cellValues.row.name, cellValues.row.price);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDelete(cellValues.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  // ! Ekleme sonrası çalışıcak
  const handleSubmitAdd = (e) => {
    e.preventDefault();

    if (newProduct && newPrice) {
      addProduct({ name: newProduct, price: newPrice });

      setIsAdd(false);
      setNewProduct("");
      setNewPrice(0);
    } else {
      alert("Boş bırakmayınız.");
    }
  };

  // ! Düzenlenecek kişi bilgileri
  const handleEdit = (index, name, price) => {
    setId(index);
    setNewProduct(name);
    setNewPrice(price);
    setIsAdd(false);
  };

  // ! Düzenleme sonrası çalışıcak
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log("Edit");

    if (newProduct && newPrice) {
      updateProduct({ id: id, name: newProduct, price: newPrice });

      setId("");
      setNewProduct("");
      setNewPrice(0);
    } else {
      alert("Boş bırakmayınız.");
    }
  };

  const handleDelete = (id) => {
    console.log("Silindi");
    deleteProduct({ id });
  };

  let content;

  if (isLoading) {
    content = <div className="lds-dual-ring"></div>;
  } else if (isSuccess) {
    content = <DataGrid rows={products} columns={columns} pageSize={6} rowsPerPageOptions={[6]} />;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div style={{ margin: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", columnGap: "64px" }}>
        <h1>Ürünler</h1>
        <Button
          variant="contained"
          disabled={isAdd}
          onClick={() => {
            setIsAdd(true);
            setNewProduct("");
            setNewPrice(0);
          }}
        >
          Yeni Ekle
        </Button>
        <div className="lds-dual-ring" style={{ display: `${isFetching && !isLoading ? "block" : "none"}` }}></div>
      </div>

      <div style={{ height: 450, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>{content}</div>

      <div style={{ marginTop: "32px", display: `${isAdd || newProduct ? "block" : "none"}` }}>
        <form onSubmit={isAdd ? handleSubmitAdd : handleSubmitEdit} style={{ display: "flex", alignItems: "center", columnGap: "16px" }}>
          <TextField label="Ürün" size="small" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
          <TextField label="Fiyat" size="small" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
          <Button type="submit" variant="contained" color={isAdd ? "success" : "secondary"}>
            {isAdd ? "Yeni Ekle" : "Düzenle"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Product;
