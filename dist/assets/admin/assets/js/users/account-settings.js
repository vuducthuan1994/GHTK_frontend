jQuery(document).ready(function($) {
  
  $('.dropify').dropify({
      messages: { 'default': 'Click to Upload or Drag n Drop', 'remove':  '<i class="flaticon-close-fill"></i>', 'replace': 'Upload or Drag n Drop' }
  });

  // Save notification messagae
//   $('#multiple-messages').on('click', function() {
//       $.blockUI({
//           message: $('.blockui-growl-message'), 
//           fadeIn: 700, 
//           fadeOut: 700, 
//           timeout: 3000, //unblock after 3 seconds
//           showOverlay: false, 
//           centerY: false, 
//           css: { 
//               width: '250px',
//               backgroundColor: 'transparent',
//               top: '80px',
//               left: 'auto',
//               right: '15px',
//               border: 0,
//               opacity: .95,
//               zIndex: 1200,
//           } 
//       }); 
//   });

  setTimeout(function(){ $('.list-group-item.list-group-item-action').last().removeClass('active'); }, 100);
});


