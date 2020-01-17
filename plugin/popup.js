
$(function(){
    let color
    $('#btnChange').click(function(){
      color = $('#fontColor').val();
      // Save color to chrome storage
      chrome.storage.local.set({color}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'content.js' });
         });
      })
    })

    $("#fontColor").on("change paste keyup", function() {
      color = $(this).val();
    });

    chrome.storage.local.get('color', function(data) {
      if(data.color)
      {
        $('#fontColor').val(data.color).css('background-color', `#${data.color}`).click()
        // Activate script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'content.js' });
        });
      }
    })
   });
