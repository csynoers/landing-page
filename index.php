<?php
//   echo '<pre>';
//   $dirs = array_filter(glob('*'), 'is_dir');
//   print_r( $dirs);
//   echo '</pre>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>my project</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
</head>
<body>
  
<div class="container border">
    <hr>
    <h2>LIST OF SINUR LANDING PAGES</h2>
    <h5>untuk melihat screenshoot posisikan mouse pada judul landing page</h5>
    <hr>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php
            foreach (array_filter(glob('*'), 'is_dir') as $key => $value) {
              echo "
                <tr>
                  <td><label class='tr-content' data-name='{$value}'>{$value}</label></td>
                  <td>
                    <a href='$value' class='text-white btn btn-primary'>view demo</a>
                  </td>
                </tr>
              ";
            }
          ?>
        </tbody>
      </table>
    </div>
    <!-- /.container -->
</div>

<!-- The Modal -->
<div class="modal fade" id="myModal">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
    
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      
      <!-- Modal body -->
      <div class="modal-body">
        Modal body..
      </div>
      
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      
    </div>
  </div>
</div>
<script>
  $(document).ready(function(){
    // $(".tr-content").on('mouseenter mouseleave',function(){
    $(".tr-content").on('mouseenter',function(){
      var modal = $("#myModal");
      modal.find('.modal-title').text('SS '+$(this).data('name'));
      modal.find('.modal-body').html('<img src="'+$(this).data('name')+'/ss.png" class="img-fluid" alt="'+$(this).data('name')+'">');
      modal.modal("show");
    })
    // click(function(){
    //   $("#myModal").modal("show");
    // });
    // $("#myModal").on('show.bs.modal', function () {
    //   alert('The modal is about to be shown.');
    // });
  })
</script>
</body>
</html>