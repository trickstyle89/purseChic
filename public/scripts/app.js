// Client facing scripts here

$(() => {
  $('.delete-button').on('click', function() {
    const productId = $(this).val();
    $.ajax({
      method: 'DELETE',
      url: '/products' + productId,
      success: function(response) {
        console.log(response);
        // Refresh the page or remove the deleted product element from the DOM
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  });

});

