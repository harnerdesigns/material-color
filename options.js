// Saves options to chrome.storage
function save_options() {
  var color = $('input[name="colorOutput"]:checked').val();
  chrome.storage.sync.set({
    "colorOutput": color
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.fadeOut();
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    colorOutput: 'hashHex'
  }, function(items) {

    $('input[value="' + items.colorOutput + '"]').attr('checked', true);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

document.body.onload = function() {
  chrome.storage.sync.get("colorOutput", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);

          }
  });
}
