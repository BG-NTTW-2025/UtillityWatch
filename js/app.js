
const KEY="UW_MONITORINGS";
let editIndex=-1;

document.querySelectorAll("#menu button").forEach(btn=>{
 btn.onclick=()=>{
  document.querySelectorAll("#menu button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById(btn.dataset.page).style.display="block";
 };
});
document.querySelector("#menu button").click();

function getData(){return JSON.parse(localStorage.getItem(KEY)||"[]");}
function setData(d){localStorage.setItem(KEY,JSON.stringify(d));}

function clearForm(){
 MonitoringName.value="";
 MonitoringProvider.value="HEP";
 MonitoringCountry.value="Kroatië";
 MonitoringProvince.value="Bjelovar";
 MonitoringPlace.value="";
 MonitoringStreet.value="";
 MonitoringNumber.value="";
 MonitoringFilter.value="Hele plaats";
 editIndex=-1;
 BtnSave.textContent="Opslaan";
 BtnCancel.style.display="none";
}

function loadCards(){
 const arr=getData();
 MonitoringList.innerHTML="";
 arr.forEach((m,i)=>{
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=
   "<h3>"+m.name+"</h3>"+
   "<div class='small'><b>Provider:</b> "+m.provider+"</div>"+
   "<div class='small'><b>Land:</b> "+m.country+"</div>"+
   "<div class='small'><b>Provincie:</b> "+m.province+"</div>"+
   "<div class='small'><b>Plaats:</b> "+m.place+"</div>"+
   "<div class='small'><b>Straat:</b> "+m.street+"</div>"+
   "<div class='small'><b>Huisnummer:</b> "+m.number+"</div>"+
   "<div class='small'><b>Filter:</b> "+m.filter+"</div>";
  const a=document.createElement("div");
  a.className="actions";
  const e=document.createElement("button");
  e.textContent="Bewerken";
  e.onclick=()=>{
    editIndex=i;
    MonitoringName.value=m.name;
    MonitoringProvider.value=m.provider;
    MonitoringCountry.value=m.country;
    MonitoringProvince.value=m.province;
    MonitoringPlace.value=m.place;
    MonitoringStreet.value=m.street;
    MonitoringNumber.value=m.number;
    MonitoringFilter.value=m.filter;
    BtnSave.textContent="Wijzigingen opslaan";
    BtnCancel.style.display="inline-block";
    window.scrollTo({top:0,behavior:"smooth"});
  };
  const d=document.createElement("button");
  d.textContent="Verwijderen";
  d.onclick=()=>{arr.splice(i,1);setData(arr);loadCards();};
  a.append(e,d);
  c.appendChild(a);
  MonitoringList.appendChild(c);
 });
}

BtnSave.onclick=()=>{
 const item={
  name:MonitoringName.value.trim(),
  provider:MonitoringProvider.value,
  country:MonitoringCountry.value,
  province:MonitoringProvince.value.trim(),
  place:MonitoringPlace.value.trim(),
  street:MonitoringStreet.value.trim()||"Alle",
  number:MonitoringNumber.value.trim()||"Alle",
  filter:MonitoringFilter.value
 };
 if(!item.name||!item.place){alert("Naam en plaats zijn verplicht.");return;}
 const arr=getData();
 if(editIndex<0) arr.push(item); else arr[editIndex]=item;
 setData(arr);
 clearForm();
 loadCards();
};
BtnCancel.onclick=clearForm;

clearForm();
loadCards();
