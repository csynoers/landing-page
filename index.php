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
              echo '
                <tr>
                  <td>'.$value.'</td>
                  <td>
                    <a href="'.$value.'" class="text-white btn btn-primary">view demo</a>
                  </td>
                </tr>
              ';
            }
          ?>
        </tbody>
      </table>
    </div>
    <!-- /.container -->
</div>

</body>
</html>