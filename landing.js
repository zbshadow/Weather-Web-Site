// Should only be triggered on first page load
console.log('start');

window.onload=function() {
    document.getElementById('location').onsubmit=function() {
    /* do what you want with the form */

    var zipCode = document.getElementById("zipCode").value;

    console.log(zipCode);

    sessionStorage.setItem("zipInput", zipCode);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    sleep(3000)
        .then (() => { 
            var fromStorage = sessionStorage.getItem('zipInput');
            console.log(fromStorage);
            let zip = Number(fromStorage);
            console.log('the zip is');
            console.log(zip);

            window.location.href ="Main\\index.html";
         })
    // Should be triggered on form submit
    // You must return false to prevent the default form behavior
    return false;
  }
}