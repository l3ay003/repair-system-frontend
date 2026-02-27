async function submitRepair() {

  const id = crypto.randomUUID();

  const fileInput = document.getElementById("imageFile");
  let base64 = "";

  if(fileInput.files[0]){
    base64 = await toBase64(fileInput.files[0]);
  }

  const payload = {
    id: id,
    userId: currentUser.userId,
    licensePlate: document.getElementById("licensePlate").value,
    mileage: document.getElementById("mileage").value,
    problem: document.getElementById("problem").value,
    estimateCost: document.getElementById("estimateCost").value,
    location: document.getElementById("location").value,
    imageBase64: base64
  };

  const res = await api("createRepair", payload);

  if(res.success){
    alert("ส่งสำเร็จ");
    location.reload();
  }else{
    alert(res.message);
  }
}

function toBase64(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>resolve(reader.result);
  });
}
