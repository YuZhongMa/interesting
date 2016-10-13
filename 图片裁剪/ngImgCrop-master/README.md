# ngImgCrop

AngularJS的简单图像裁剪指令。 允许从图像中裁剪圆形或正方形。

## 截图

![圆形截图](https://raw.github.com/alexk111/ngImgCrop/master/screenshots/circle_1.jpg "Circle Crop")

![方形截图](https://raw.github.com/alexk111/ngImgCrop/master/screenshots/square_1.jpg "Square Crop")

## Live demo

[Live demo on JSFiddle](http://jsfiddle.net/alexk111/rw6q9/)

## 要求

 - AngularJS
 - Modern Browser supporting <canvas>

## 安装

### 下载

您有两个选项来获取文件
- [Download ngImgCrop](https://github.com/alexk111/ngImgCrop/archive/master.zip) 从GitHub下载ngImgCrop文件。
- 使用Bower下载文件。 只需运行bower install ngImgCrop。

### 添加文件

将脚本添加到应用程序。 确保在angular.js库之后插入ng-img-crop.js文件:

```html
<script src="angular.js"></script>
<script src="ng-img-crop.js"></script>
<link rel="stylesheet" type="text/css" href="ng-img-crop.css">
```

### 添加依赖关系

将图像裁剪模块添加为应用程序模块的依赖关系:

```js
var myAppModule = angular.module('MyApp', ['ngImgCrop']);
```

## 用法

1.将图片裁剪指令<img-crop>添加到要使用图片裁剪控件的HTML文件。注意：一个容器，你放置指令，应该有一些预定义的大小（绝对或相对于其父）。这是必需的，因为图像裁剪控件适合其容器的大小。
2. 将指令绑定到源图像属性（使用image =“”选项）。指令将从该属性读取图像数据并监视更新。该属性可以是图像的url或数据uri。
3. 将指令绑定到结果图像属性（使用result-image =“”选项）。在每次更新时，指令将把裁剪区域的内容以数据uri格式放置到该属性。
4. 设置对您的应用程序有意义的选项。
5. 完成！

## 结果图像

结果图像将始终为圆形和方形区域类型的正方形。强烈建议将图像作为正方形存储在后端，因为如果您决定实施某些设计更改，这将使您能够轻松地更新图片。将正方形图像显示为前端上的圆形不是问题 - 它像在css中为该图像添加border-radius样式一样容易。

## 示例代码

以下代码允许使用文件输入选择图像并裁剪它。每次裁剪区域更新时，裁剪的图像数据被插入到img中。

```html
<html>
<head>
  <script src="angular.js"></script>
  <script src="ng-img-crop.js"></script>
  <link rel="stylesheet" type="text/css" href="ng-img-crop.css">
  <style>
    .cropArea {
      background: #E4E4E4;
      overflow: hidden;
      width:500px;
      height:350px;
    }
  </style>
  <script>
    angular.module('app', ['ngImgCrop'])
      .controller('Ctrl', function($scope) {
        $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
      });
  </script>
</head>
<body ng-app="app" ng-controller="Ctrl">
  <div>Select an image file: <input type="file" id="fileInput" /></div>
  <div class="cropArea">
    <img-crop image="myImage" result-image="myCroppedImage"></img-crop>
  </div>
  <div>Cropped Image:</div>
  <div><img ng-src="{{myCroppedImage}}" /></div>
</body>
</html>
```

## Options

```html
<img-crop
    image="{string}"
    result-image="{string}"
   [change-on-fly="{boolean}"]
   [area-type="{circle|square}"]
   [area-min-size="{number}"]
   [result-image-size="{number}"]
   [result-image-format="{string}"]
   [result-image-quality="{number}"]
   [on-change="{expression}"]
   [on-load-begin="{expression"]
   [on-load-done="{expression"]
   [on-load-error="{expression"]
></img-crop>
```

### image

选取的图片. NgImgCrop 获得一个图片进行裁剪.

### result-image

结果图片. NgImgCrop 将截取的图片地址绑定到此.

### change-on-fly

*可选的*. 默认情况下，为了降低CPU使用率，当用户拖动或调整裁剪区域大小时，结果图像仅在用户停止拖动/调整大小后更新。设置为true以在用户拖动/调整裁剪区域时始终更新结果图像。

### area-type

*可选的*. 裁剪区域的类型。可能的值：circle | square。默认值：圆。

### area-min-size

*可选的*. 最小。裁剪区域的宽度/高度（以像素为单位）。默认值：80。

### result-image-size

*可选的*. 结果图片的宽度/高度（以像素为单位）。默认值：200。

### result-image-format

*可选的*. 结果图像的质量。可能的值介于0.0和1.0之间（含）。默认值：浏览器默认值。

### result-image-quality

*可选的*. 结果图像的质量。可能的值介于0.0和1.0之间（含）。默认值：浏览器默认值。

### on-change

*可选的*. 改变图像裁剪部分时所执行的操作. 截取的图片用$dataUrl绑定.

### on-load-begin

*可选的*.用于控制什么时候加载 .

### on-load-done

*可选的*. 加载成功时执行的操作.

### on-load-error

*可选的*.加载失败时所执行的操作 .


## License

See the [LICENSE](https://github.com/alexk111/ngImgCrop/blob/master/LICENSE) file.

