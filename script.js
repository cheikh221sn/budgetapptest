const modaldep = document.getElementById("myModaldep");
let totalDepenseStorage = []
console.log("totalDepenseStorage",totalDepenseStorage)
const btnValidDep = document.getElementById("BtnValidDep");
let totalRevenueStorage = []
console.log("totalRevenueStorage" ,totalRevenueStorage)
const span = document.getElementsByClassName("close")[0];

btnValidDep.onclick = function () {
  modaldep.style.display = "block";
};

span.onclick = function () {
  modaldep.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modaldep) {
    modaldep.style.display = "none";
  }
};

let modalrev = document.getElementById("myModalrev");
let modalmod = document.getElementById("myModalmod");
let modalmodrev = document.getElementById("myModalmodRev");

let btnValidRev = document.getElementById("BtnValidRev");

let span1 = document.getElementsByClassName("close")[1];
let span2 = document.getElementsByClassName("close")[2];
let span3 = document.getElementsByClassName("close")[3];

btnValidRev.onclick = function () {
  modalrev.style.display = "block";
}; 
span1.onclick = function () {
  modalrev.style.display = "none";
};
span2.onclick = function () {
  modalmod.style.display = "none";
};
span3.onclick = function () {
  modalmodrev.style.display = "none";
  
};



let btn_valider_depense = document.getElementById("but_valider_depense");
let categ = document.getElementById("cat");
let montantdep = document.getElementById("montantdep");
let TotalDepense = document.getElementById("TotalDepense");
let TotalRevenue = document.getElementById("TotalRevenue");
let Solde = document.getElementById("Solde");

class depense {
  constructor(categorie, montant, codeCategorie) {
    this.categorie = categorie;
    this.montant = montant;
    this.code = codeCategorie;
  }
}
let depenses = [];

class revenue {
  constructor(classe, montant, codeClasse) {
    this.classe = classe;
    this.montant = montant;
    this.code = codeClasse;
  }
}
let revenues = [];

//? fonction pour ajouter une depense
btn_valider_depense.onclick = function () {
  if (categ.options[categ.selectedIndex].value === "") {
    alert("Veuillez choisir une catégorie");
  } else {


    if (parseFloat(montantdep.value) > parseFloat(Solde.innerHTML)) {
      alert("Le solde est insuffisante pour effectuer cette dépense")
    }
    else {
const totaldep = parseFloat(TotalDepense.innerHTML) + parseFloat(montantdep.value);
    TotalDepense.innerHTML = totaldep
     
    Solde.innerHTML =
      parseFloat(TotalRevenue.innerHTML) - parseFloat(TotalDepense.innerHTML);
      let depense1 = new depense(
      categ.options[categ.selectedIndex].text,
      parseFloat(montantdep.value),
      categ.options[categ.selectedIndex].value
    );
console.log("depense1",depense1)
totalDepenseStorage.push({categorie:depense1.categorie,montant:depense1.montant})
localStorage.setItem("depense", JSON.stringify(totalDepenseStorage))
    let index = depenses.findIndex(function (elt) {
      return elt.code === categ.options[categ.selectedIndex].value;
    });

    if (index !== -1) {
      depenses[index].montant =  depenses[index].montant + parseFloat(montantdep.value);
    } else {
      depenses.push(depense1);
    }
    // alert("La dépense a été ajoutée avec succès");
    categ.options[0].selected = true;
    montantdep.value = "";
    // localStorage.setItem("depense", JSON.stringify(totaldep))
    chargerTableDepense();
    modaldep.style.display="none"

  }

  }
};

function chargerTableDepense() {
  let depenseTable = document.querySelector(".depenseTable");
  let tableHeaderRowCount = 1;
  let table = document.getElementById("tblDep");
  let rowCount = table.rows.length;
  for (let i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }

  for (let j = 0; j < depenses.length; j++) {
    let depenseTableBodyRow = document.createElement("tr");
    depenseTableBodyRow.className = "depenseItem";
    let depenseCateg = document.createElement("td");
    depenseCateg.innerText = depenses[j].categorie;
    let depenseMontant = document.createElement("td");
    depenseMontant.innerText = depenses[j].montant;
    let action1 = document.createElement("td");
    let btnMod = document.createElement("button");
    btnMod.style.background="white"
    btnMod.innerText = "Modifier";
    btnMod.id = depenses[j].code + "mod";
    let btnSup = document.createElement("button");
    btnSup.innerText = "Supprimer";
    btnSup.id = depenses[j].code + "sup";

    btnMod.onclick = function () {
      let idbtn = this.id.substring(0, 4);
      modalmod.style.display = "block";
      let index1 = depenses.findIndex(function (elt) {
        return elt.code === idbtn;
      });
      let nouveauMontant = document.getElementById("nouveauMontant");
      let labelCateg = document.getElementById("labelCateg");
      let codeCateg = document.getElementById("codecateg");
      labelCateg.innerText = depenses[index1].categorie;
      nouveauMontant.value = depenses[index1].montant;
      codeCateg.value = depenses[index1].code;
    };
    btnSup.onclick = function () {
      let idbtn = this.id.substring(0, 4);
      let index1 = depenses.findIndex(function (elt) {
        return elt.code === idbtn;
      });
      if (index1 !== -1) {
      let process_something = window.confirm(
        "Voulez-vous supprimer la dépense " + depenses[index1].categorie + " ?"
      );
      if (process_something) {                
          TotalDepense.innerHTML =  parseFloat(TotalDepense.innerHTML) -  depenses[index1].montant;
          Solde.innerHTML =     parseFloat(TotalRevenue.innerHTML) -       parseFloat(TotalDepense.innerHTML);
          depenses.splice(index1, 1);
          alert("La dépense  a été supprimée avec succès");
        }
        chargerTableDepense();
      }
    };
    action1.append(btnMod, btnSup);
    depenseTableBodyRow.append(depenseCateg, depenseMontant, action1);
    depenseTable.append(depenseTableBodyRow);
  }
}

function chargerTableRevenue() {
  let revenueTable = document.querySelector(".revenueTable");
  let tableHeaderRowCount = 1;
  let table = document.getElementById("tblRev");
  let rowCount = table.rows.length;
  for (let i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }

  for (let j = 0; j <revenues.length; j++) {
    let revenueTableBodyRow = document.createElement("tr");
    revenueTableBodyRow.className = "revenueItem";
    let revenueCla = document.createElement("td");
   revenueCla.innerText =revenues[j].classe; 
   let revenueMontant = document.createElement("td");
   revenueMontant.innerText =revenues[j].montant; 
   let action1 = document.createElement("td");
   let btnMod = document.createElement("button");
   btnMod.style.background="white"
    btnMod.innerText = "Modifier";
    btnMod.id =revenues[j].code + "mod";
    let btnSup = document.createElement("button");
    btnSup.innerText = "Supprimer";
    btnSup.id =revenues[j].code + "sup";

    btnMod.onclick = function () {
      let idbtn = this.id.substring(0, 4);
      modalmodrev.style.display = "block";
      let index1 =revenues.findIndex(function (elt) {
        return elt.code === idbtn;
      });
      let nouveauMontantRev = document.getElementById("nouveauMontantRev");
      let labelCla = document.getElementById("labelCla");
      let codeCla = document.getElementById("codecla");
      labelCla.innerText = revenue[index1].classe;
      nouveauMontantRev.value =revenues[index1].montant;
      codeCla.value =revenues[index1].code;
    };
    btnSup.onclick = function () {
      let idbtn = this.id.substring(0, 4);
      let index1 =revenues.findIndex(function (elt) {
        return elt.code === idbtn;
      });
      if (index1 !== -1) {
        let process_something = window.confirm(
        "Voulez-vous supprimer le revenu " +revenues[index1].classe + " ?"
      );
      if (process_something) {   
        let newSolde = parseFloat(TotalRevenue.innerHTML) - revenues[index1].montant - parseFloat(TotalDepense.innerHTML);
        if (newSolde < 0 )
        {
          alert("Vous ne pouvez pas supprimé ce revenu sinon le solde sera négatif ");
        } else {
        
          TotalRevenue.innerHTML =  parseFloat(TotalRevenue.innerHTML) - revenues[index1].montant;
          Solde.innerHTML =     parseFloat(TotalRevenue.innerHTML) -    parseFloat(TotalDepense.innerHTML);
         revenues.splice(index1, 1);
          alert("Le revenu  a été supprimé avec succès");
          chargerTableRevenue();
        }
        }
      }
    };
    action1.append(btnMod, btnSup);
    revenueTableBodyRow.append(revenueCla, revenueMontant, action1);
    revenueTable.append(revenueTableBodyRow);
  }
}

let btn_valider_revenue = document.getElementById("but_valider_revenue");
let cla = document.getElementById("cla");
let montantrev = document.getElementById("montantrev");

//!fonction pour valider une revenue
btn_valider_revenue.onclick = function () {
  if (cla.options[cla.selectedIndex].value === "") {
    alert("Veuillez choisir une classe");
  } else {
    const totalrev =parseFloat(TotalRevenue.innerHTML) + parseFloat(montantrev.value);
    TotalRevenue.innerHTML =totalrev
    
  Solde.innerHTML =
    parseFloat(TotalRevenue.innerHTML) - parseFloat(TotalDepense.innerHTML);


    let revenue1 = new revenue(
      cla.options[cla.selectedIndex].text,
      parseFloat(montantrev.value),
      cla.options[cla.selectedIndex].value
    );
    console.log("revenue1",revenue1)
    totalRevenueStorage.push({classe:revenue1.classe,montant:revenue1.montant})
   localStorage.setItem("revenue", JSON.stringify(totalRevenueStorage))
    let index = revenues.findIndex(function (elt) {
    
      return elt.code === cla.options[cla.selectedIndex].value;
    });

    if (index !== -1) {
      revenues[index].montant =  revenues[index].montant + parseFloat(montantrev.value);
    } else {
      revenues.push(revenue1);
    }
    // alert("Le revenu a été ajoutée avec succès");
    cla.options[0].selected = true;
    // localStorage.setItem("revenu", JSON.stringify(totalrev));
    
    montantdep.value = "";
    chargerTableRevenue();
    modalrev.style.display="none"
  }
  
};

let but_nouveau_montant = document.getElementById("but_nouveau_montant")
let but_nouveau_montant_rev = document.getElementById("but_nouveau_montant_rev")

but_nouveau_montant.onclick = function () {
  let nouveauMontant = document.getElementById("nouveauMontant");
  let codeCateg = document.getElementById("codecateg");
  let index = depenses.findIndex(function (elt) {
    return elt.code === codeCateg.value;
  });

  let nouveauSolde = parseFloat(TotalRevenue.innerHTML) - (parseFloat(TotalDepense.innerHTML) +
  parseFloat(nouveauMontant.value) -
  depenses[index].montant);

  if (nouveauSolde < 0) {
    alert("Le solde est insuffisante pour effectuer cette dépense")
  }
  else {
  
  
  if (index !== -1) {
    TotalDepense.innerHTML =
      parseFloat(TotalDepense.innerHTML) +
      parseFloat(nouveauMontant.value) -
      depenses[index].montant;
    Solde.innerHTML =
      parseFloat(TotalRevenue.innerHTML) - parseFloat(TotalDepense.innerHTML);
    depenses[index].montant = parseFloat(nouveauMontant.value);
    alert("Le montant a été modifié avec succès");
  }
  chargerTableDepense();}
};

but_nouveau_montant_rev.onclick = function () {
  let nouveauMontantRev = document.getElementById("nouveauMontantRev");
  let codeCla = document.getElementById("codecla");
  let index = revenues.findIndex(function (elt) {
    return elt.code === codeCla.value;
  });

  let  nouveauSolde = parseFloat(TotalRevenue.innerHTML) - revenues[index].montant + parseFloat(nouveauMontantRev.value) - parseFloat(TotalDepense.innerHTML);

  if (nouveauSolde < 0) {
    alert("Le solde sera négatif si vous enlevez ce revenu ")
  }
  else {
  
  if (index !== -1) {
    TotalRevenue.innerHTML =
      parseFloat(TotalRevenue.innerHTML) +
      parseFloat(nouveauMontantRev.value) -
      revenues[index].montant;
    Solde.innerHTML =
      parseFloat(TotalRevenue.innerHTML) - parseFloat(TotalDepense.innerHTML);
    revenues[index].montant = parseFloat(nouveauMontantRev.value);
    alert("Le montant a été modifié avec succès");
  }
  chargerTableRevenue();}
  
  
  start();
}

// Update local storage transactions
// function updateLocalStorage(totaldep) {
  // localStorage.setItem("revenu", JSON.stringify(totaldepense));
  // localStorage.setItem("depense", JSON.stringify(totaldep));

// }




// start()

  


// localStorage.setItem( "categorie", JSON.stringify(cat))
document.addEventListener("DOMContentLoaded",function(){

 const depense = localStorage.getItem("depense")
 console.log ({depense})
  if(depense !== null){
  depenses.push(...JSON.parse(depense) )
 chargerTableDepense()
 totalDepenseStorage.push(...JSON.parse(depense))
 }

 
  const revenue = localStorage.getItem("revenue")
  console.log ({revenue})
  if(revenue !== null){
    revenues.push(...JSON.parse(revenue))
    chargerTableRevenue() 
    totalRevenueStorage.push(...JSON.parse(revenue))
    


  }

 })

