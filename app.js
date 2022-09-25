const form = document.querySelector('.form')
const container = document.querySelector('.box')
const output = document.querySelector('.output')
let profileSrc = null

let inputShow = true


async function TextEditor(element) {
  const newEditor = await ClassicEditor
    .create(element, {
      toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote'],
    })
  return newEditor

}

let workExpdetails;
TextEditor(form["workexp"]).then(nEditor => {
  workExpdetails = nEditor
})
let Academic;
TextEditor(form["academics"]).then(nEditor => {
  Academic = nEditor
})
let Skills;
TextEditor(form["skills"]).then(nEditor => {
  Skills = nEditor
})
let Projects;
TextEditor(form["projects"]).then(nEditor => {
  Projects = nEditor
})
let Certifications;
TextEditor(form["achievements"]).then(nEditor => {
  Certifications = nEditor
})


function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
document.getElementById('propic').onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files;
  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      console.log(fr.result);
      profileSrc = fr.result;
    }
    fr.readAsDataURL(files[0]);
  }

  // Not supported
  else {
    // fallback -- perhaps submit the input to an iframe and temporarily store
    // them on the server until the user's session ends.
  }
}

function profilepic() {

}

function toggle() {

  if (inputShow && ValidateEmail(form["mail"].value)) {
    container.style.display = "none"
    inputShow = false
    output.innerHTML = `
           <div class="bg-secondary text-white py-3 d-flex align-items-center">
           <div class="col-1 ms-5">
           <img class="img-thumbnail px-1" src="${profileSrc}" alt="profile">
           </div>
            <div class="col-8 ms-5">
            <h1>${form["name"].value}</h1>
            <h3>${form["title"].value}</h3>
            <p>${form["mail"].value}</p></div>
           </div>
           <div class="main">
               <div class="ms-3 col-6">
                 <h2 class="fw-semibold">Objective</h2>
                 <p>${form["objective"].value}</p>
                 <h2 class="fw-semibold">Skill</h2>
                 <p>${Skills.getData()}</p>
                 <h2 class="fw-semibold">Certifications</h2>
                 <p>${Certifications.getData()}</p>
                 <h2 class="fw-semibold">Address</h2>
                 <p>${form["contact"].value}</p>
               </div>
               <div class="ms-3 col-6">
                <h2 class="fw-semibold">Professional experience</h2>
                ${workExpdetails.getData()}
                <h2 class="fw-semibold">Education details</h2>
                 ${Academic.getData()}
                <h2 class="fw-semibold">Projects</h2>
                <p>${Projects.getData()}</p>
               </div>
           </div>
           <div class="d-flex justify-content-center mb-3" >
              <button class = "btn btn-primary" onclick = "print()"> Print Resume </button>
        </div>
         `
  } else {
    container.style.display = "block"
    inputShow = true
    output.innerHTML = ""
  }
}