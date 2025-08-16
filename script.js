const fileInput = document.getElementById('uploadfile');
const preview = document.getElementById('preview');
const sendButton = document.getElementById('send');
const solutionbox = document.getElementById('solution');

fileInput.addEventListener('change',()=>{
    const file = fileInput.files[0];
    if(file){
      const reader =  new FileReader();
      reader.onload = function(e){
        preview.src = e.target.result;
        preview.style.display = 'block'
      }
      reader.readAsDataURL(file);
    }
});

sendButton.addEventListener('click', async () => {
   const file = fileInput.files[0];
   if(!file){
         alert('please upload image first');
         return;
   }

   const formData = new FormData();
   formData.append('image',file);
   try{

    const response= await fetch('http://127.0.0.1:8000/imageprocess',{
       method:'POST',
       body:formData
    });
    
    const data = await response.json();
    solutionbox.textContent = data.message || "No result found , 0%";
   }
   catch(error){
     console.error("erroe sending image",error);
     solutionbox.textContent = "Error Occurred";
   }
});

