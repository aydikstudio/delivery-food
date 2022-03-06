<?php 
require 'config.php';

$permitted_chars = 'Nuok-3f9IOdSwVKTTIVgjDf2M-MUKG318a3g4UvZnVnelb0iBEl2zib3PF9NmC1YsrAe87z_ERFyD0ePhLMLtv6CjQAJYJQiMRnEPjp0tskCHmSSDsghQwcAe_Nukw2W921HP6YKDPc-Ix_nYIch5lDUA26XYIFKqckJ8sEo66TVKc-sRxvQE5gqpUANQ5itwcef0x_N';

if(isset($_GET)) {

    

    if($_GET['type'] == 'getdata' ) {
        $user_id = getUserId($mysqli, $_GET['token']);

        $query_add = "SELECT name, email FROM `users` WHERE user_id=".$user_id;
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'allgetsubcategories' ) {
        $query_add = "SELECT * FROM `categories` WHERE parent_id=".$_GET['id'];
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }

    if($_GET['type'] == 'getmyorder' ) {
        

         $user_id = getUserId($mysqli, $_GET['token']);


        $query_add = "SELECT * FROM `orders`  WHERE user_id='".$user_id."' and order_id=".$_GET['name'];
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo  json_encode($data);
    }



    if($_GET['type'] == 'getmyorders' ) {
        
        $user_id = getUserId($mysqli, $_GET['token']);


        $query_add = "SELECT * FROM ordersdetail od JOIN products p ON od.product_id = p.productId  WHERE user_id='".$user_id."' and order_number='".$_GET['name']."'";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo  json_encode($data);
    }



    if($_GET['type'] == 'getorders' ) {
        $user_id = getUserId($mysqli, $_GET['token']);

        $query_add = "SELECT * FROM `orders`  WHERE user_id='".$user_id."' ORDER BY order_id DESC";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo  json_encode($data);
    }


    if($_GET['type'] == 'allgetcategories' ) {
        $query_add = "SELECT * FROM `categories`";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }



    if($_GET['type'] == 'allgetcategoriesbyparent' ) {
        $query_add = "SELECT * FROM `categories` WHERE parent_id=0";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'allgetproducts' ) {
        $query_add = "SELECT * FROM `products`";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }



    if($_GET['type'] == 'getproductbyid' ) {
        $query_add = "SELECT * FROM `products` WHERE productId=".$_GET['id'];
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'getaddress' ) {
        $user_id = getUserId($mysqli, $_GET['token']);

        $query_add = "SELECT `address` FROM orders  WHERE user_id='".$user_id."' LIMIT 3";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'getdescriptions' ) {
        $user_id = getUserId($mysqli, $_GET['token']);

        $query_add = "SELECT `descriptions` FROM orders  WHERE user_id='".$user_id."' LIMIT 3";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         
         echo  json_encode($data);
    }




    if($_GET['type'] == 'allgetproductsbyidcategories' ) {
        $query_add_products = "SELECT * FROM products  WHERE  category_id=".$_GET['id'];
        $res_products = mysqli_query($mysqli, $query_add_products);
        while ($result_products =  mysqli_fetch_assoc($res_products)) {
            $data_products[] = $result_products;
         }

        //  $query_add_categories = "SELECT * FROM categories  WHERE  parent_id=".$_GET['id'];
        // $res_categories = mysqli_query($mysqli, $query_add_categories);
        // $count = mysqli_num_rows($res_categories);
        // if($count > 0) {

        //     while ($result =  mysqli_fetch_assoc($res_categories)) {
        //         $data[] = $result;
        //      }
            
             
        //      $arr = getSubCategoroes($mysqli, $data);

        //      $data_categories = array_merge($data, $arr);
             
        // }
        
         
         echo json_encode($data_products);
    }


   



    if($_GET['type'] == 'login' ) {
        $token = generate_string($permitted_chars, 100);
        $sql = "SELECT * FROM `users` WHERE `phone` = '".$_GET['phone']."'";
        $query = mysqli_query($mysqli, $sql);
     
        $count = mysqli_num_rows($query);

        if($count ==  0) {
            $query_add = "INSERT INTO `users`(`phone`, `token`)  VALUES ('".$_GET['phone']."', '".$token."') ";
            $res = mysqli_query($mysqli, $query_add);
        } else {
            while ($result =  mysqli_fetch_assoc($query)) {
                $data[] = $result;
             }

             $token = $data[0]['token'];
        }
     
      

         echo  $token;
       
    }




    if($_GET['type'] == 'search' ) {
       
        $query_add_products = "SELECT * FROM `products` WHERE `productName` LIKE '%".$_GET['text']."%'  LIMIT 3";
        $res_products = mysqli_query($mysqli, $query_add_products);
        $data = [];
        $data_products = [];
        while ($result_products =  mysqli_fetch_assoc($res_products)) {
            $data_products[] = $result_products;
         }


         $query_add_categories = "SELECT * FROM `categories` WHERE `name` LIKE '%".$_GET['text']."%'  LIMIT 3";
        $res_categories = mysqli_query($mysqli, $query_add_categories);
        $data_categories = [];
        while ($result_categories =  mysqli_fetch_assoc($res_categories)) {
            $data_categories[] = $result_categories;
         }

         array_push($data, $data_products, $data_categories);

         echo json_encode($data);
       
    }



    if($_GET['type'] == 'allsearch' ) {
       
        $query_add_products = "SELECT * FROM `products` WHERE `productName` LIKE '%".$_GET['text']."%'";
        $res_products = mysqli_query($mysqli, $query_add_products);
        $data = [];
        $data_products = [];
        while ($result_products =  mysqli_fetch_assoc($res_products)) {
            $data_products[] = $result_products;
         }


         $query_add_categories = "SELECT * FROM `categories` WHERE `name` LIKE '%".$_GET['text']."%'";
        $res_categories = mysqli_query($mysqli, $query_add_categories);
        $data_categories = [];
        while ($result_categories =  mysqli_fetch_assoc($res_categories)) {
            $data_categories[] = $result_categories;
         }

         array_push($data, $data_products, $data_categories);

         echo json_encode($data);
       
    }

} 



if(isset($_POST)) {


    if($_POST['type'] == 'finishorder') {
        $date = date("d/m/Y");
        $time = date("H:i");
        $company= $_POST["company"];
        $address = $_POST["address"];
        $description = $_POST["description"];
        $count_money = $_POST["summa"];
        $change = $_POST["change"];
        $payment = $_POST["payment"];
        $token = $_POST['token'];
        $basket = json_decode($_POST["basket"]);
        $generatednumberorder = rand(10, 9999999999999);


        $sql = "SELECT * FROM `orders` WHERE `order_number` = '".$generatednumberorder."'";
        $query = mysqli_query($mysqli, $sql);
        $count = mysqli_num_rows($query);
       if($count > 0) {
           while($count > 0) {
            $generatednumberorder = rand(10, 999999999999999999999999999);
            $sql = "SELECT * FROM `orders` WHERE `order_number` = '".$generatednumberorder."'";
            $query = mysqli_query($mysqli, $sql);
            $count = mysqli_num_rows($query);
           }
       } 


  

         $user_id = getUserId($mysqli, $_POST['token']);
    

       $query_add = "INSERT INTO `orders` (`order_number`, `date`, `time`, `summa`, `oplata`, `change`, `status`, `address`, `descriptions`, `user_id`) 
       VALUES ('".$generatednumberorder."','".$date."' ,'".$time."' ,'".$count_money."', '".$payment."', '".$change."', 'Создан', '".$address."', '".$description."', ".$user_id.")";
       $query = mysqli_query($mysqli, $query_add);
     


       $data_products=[];

       for($i = 0; $i<count($basket); $i++) {
           $query_add3 = "SELECT * FROM `products` WHERE productId=".$basket[$i]->productId;
           $res = mysqli_query($mysqli, $query_add3);
           while ($result =  mysqli_fetch_assoc($res)) {
            $result['count'] =  $basket[$i]->count;
            $data_products[] = $result;
            }
       }


       for($i = 0; $i<count($data_products); $i++) {
             $query_add2 = "INSERT INTO `ordersdetail`(`order_number`, `product_id`, `summa`, `count`, `user_id`)  
        VALUES ('".$generatednumberorder."',".$data_products[$i]['productId'].",".$data_products[$i]['price'].",'".$data_products[$i]['count']."', ".$user_id.") ";
        $res = mysqli_query($mysqli, $query_add2);
       }


        

       echo "yes";

    }
    
    if($_POST['type'] == 'checklogin' ) {
        $status = "";
        $sql = "SELECT * FROM `users` WHERE `token` = '".$_POST['token']."'";
        $query = mysqli_query($mysqli, $sql);
     
        $count = mysqli_num_rows($query);

        if($count ==  0) {
           $status = "no";
        } else {
            $status = "yes";
        }
     
      

         echo  $status;
       
    }
    

    if($_POST['type'] == 'getproductsbybasket') {
        $basket = json_decode($_POST['basket']);

        $data=[];

        for($i = 0; $i<count($basket); $i++) {
            $query_add = "SELECT * FROM `products` WHERE productId=".$basket[$i]->productId;
            $res = mysqli_query($mysqli, $query_add);
            while ($result =  mysqli_fetch_assoc($res)) {
                $data[] = $result;
             }
        }
        
         echo json_encode($data);
    }


    if($_POST['type'] == 'updateddatasettings') {

        $user_id = getUserId($mysqli, $_POST['token']);
        $name = $_POST['name'];
        $email = $_POST['email'];

        $sql = "UPDATE users SET name='".$name."', email='".$email."' WHERE user_id".$user_id;
        $query = mysqli_query($mysqli, $sql);
        echo  "yes";

    }

}





function generate_string($input, $strength = 16) {
    $input_length = strlen($input);
    $random_string = '';
    for($i = 0; $i < $strength; $i++) {
        $random_character = $input[mt_rand(0, $input_length - 1)];
        $random_string .= $random_character;
    }
 
    return $random_string;
}

function getSubCategoroes($mysqli, $arr) {

    $data_categories = [];

  
    for($i = 0; $i < count($arr); $i++) {
        $query_add_categories = "SELECT * FROM categories  WHERE  parent_id=".$arr[$i]['parent_id'];
        $res_categories = mysqli_query($mysqli, $query_add_categories);
        $count = mysqli_num_rows($res_categories);
        if($count > 0) {

            while ($result =  mysqli_fetch_assoc($res_categories)) {
                $data_categories[] = $result;
             }

    

            //  getSubCategoroes($mysqli, $data_categories);
        } 
        else {
            break;
        }
        
       
    }
   
    return  $data_categories;
}



function getUserId($mysqli, $token) {
    $query_add2 = "SELECT * FROM `users` WHERE token='".$token."'";
    $res2 = mysqli_query($mysqli, $query_add2);
    while ($result =  mysqli_fetch_assoc($res2)) {
        $data1[] = $result;
     }

     return $data1[0]['user_id'];
}
?>