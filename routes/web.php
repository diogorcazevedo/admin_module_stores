<?php


use App\Http\Controllers\JewelExternalController;
use App\Http\Controllers\JewelExternalImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceExternalController;
use App\Http\Controllers\ServiceExternalItemsController;
use App\Http\Controllers\ServiceLegacyController;
use App\Http\Controllers\ServiceLegacyItemsController;
use App\Http\Controllers\ServiceSalesController;
use App\Http\Controllers\ServiceSalesItemsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\LeadController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProposalController;
//use App\Http\Controllers\ReverseLogisticController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ShippingReverseLogisticController;
use App\Http\Controllers\ShippingSigepeController;
use App\Http\Controllers\SigepeController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\SupportMessagesController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

//Route::get('/index',                                                              [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);
//Route::get('/dashboard/{year?}/{month?}',                                         [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);

Route::redirect('/index', '/stores/dashboard/index/{year?}/{month?}');
Route::redirect('/dashboard', '/stores/dashboard/index/{year?}/{month?}');

Route::get('/',                                                                 [DashBoardController::class, 'index'])->name('index')->middleware(['auth', 'verified','check']);
Route::get('/dashboard/index/{year?}/{month?}',                                 [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified','check']);

Route::get('sales/index/{year?}/{month?}',                                      [SaleController::class, 'index'])->name('sales.index')->middleware(['auth', 'verified','check']);
Route::get('proposal/index/{year?}/{month?}',                                   [ProposalController::class, 'index'])->name('proposal.index')->middleware(['auth', 'verified','check']);



Route::any('product/index/{collection?}/{category?}',             [ProductController::class, 'index'])->name('product.index')->middleware(['auth', 'verified','check']);
Route::get('product/create',                                      [ProductController::class, 'create'])->name('product.create')->middleware(['auth', 'verified','check']);
Route::post('product/store',                                      [ProductController::class, 'store'])->name('product.store')->middleware(['auth', 'verified','check']);
Route::get('product/edit/{product}',                              [ProductController::class, 'edit'])->name('product.edit')->middleware(['auth', 'verified','check']);
Route::post('product/update/{product}',                           [ProductController::class, 'update'])->name('product.update')->middleware(['auth', 'verified','check']);
Route::get('product/destroy/{product}',                           [ProductController::class, 'destroy'])->name('product.destroy')->middleware(['auth', 'verified','check']);

Route::get('product/images/index/{product}',                      [ProductController::class, 'images'])->name('product.images.index')->middleware(['auth', 'verified','check']);
Route::post('product/image/store/{product}',                      [ProductController::class, 'imageStore'])->name('product.image.store')->middleware(['auth', 'verified','check']);
Route::get('product/image_destroy/{image}',                       [ProductController::class, 'imageDestroy'])->name('product.image.destroy')->middleware(['auth', 'verified','check']);

Route::post('product/price_change/{product}',                     [ProductController::class, 'price_change'])->name('product.price.change')->middleware(['auth', 'verified','check']);
Route::post('product/price_store/{product}',                      [ProductController::class, 'price_store'])->name('product.price.store')->middleware(['auth', 'verified','check']);
Route::get('product/image/download/{id}',                         [ProductImageController::class, 'download'])->name('product.image.download')->middleware(['auth', 'verified','check']);


Route::any('user/index',                                          [UserController::class, 'index'])->name('user.index')->middleware(['auth', 'verified','check']);
Route::get('user/paginate/{letter}',                              [UserController::class, 'paginate'])->name('user.paginate')->middleware(['auth', 'verified','check']);
Route::get('user/create',                                         [UserController::class, 'create'])->name('user.create')->middleware(['auth', 'verified','check']);
Route::post('user/store',                                         [UserController::class, 'store'])->name('user.store')->middleware(['auth', 'verified','check']);
Route::get('user/edit/{user}',                                    [UserController::class, 'edit'])->name('user.edit')->middleware(['auth', 'verified','check']);
Route::post('user/update/{user}',                                 [UserController::class, 'update'])->name('user.update')->middleware(['auth', 'verified','check']);
Route::get('user/destroy/{user}',                                 [UserController::class, 'destroy'])->name('user.destroy')->middleware(['auth', 'verified','check']);
Route::get('user/password/{user}',                                [UserController::class, 'password'])->name('user.password')->middleware(['auth', 'verified','check']);
Route::get('user/update_password/{user}',                         [UserController::class, 'update_password'])->name('user.update.password')->middleware(['auth', 'verified','check']);
Route::get('user/birthdays',                                      [UserController::class, 'birthdays'])->name('user.birthdays')->middleware(['auth', 'verified','check']);
Route::get('user/print_address/{user}',                           [UserController::class, 'print_address'])->name('user.print.address')->middleware(['auth', 'verified','check']);


Route::any('order/client',                                        [OrderController::class, 'client'])->name('order.client')->middleware(['auth', 'verified','check']);
Route::get('order/store/{user}',                                  [OrderController::class, 'store'])->name('order.store')->middleware(['auth', 'verified','check']);
Route::any('order/product/{order}/{collection?}/{category?}',     [OrderController::class, 'product'])->name('order.product')->middleware(['auth', 'verified','check']);
Route::get('order/add/{order}/{product}',                         [OrderController::class, 'add'])->name('order.add')->middleware(['auth', 'verified','check']);
Route::get('order/remove/{orderItem}',                            [OrderController::class, 'remove'])->name('order.remove')->middleware(['auth', 'verified','check']);
Route::get('order/edit/{order}',                                  [OrderController::class, 'edit'])->name('order.edit')->middleware(['auth', 'verified','check']);
Route::post('order/update/{order}',                               [OrderController::class, 'update'])->name('order.update')->middleware(['auth', 'verified','check']);
Route::get('order/links/{order}',                                 [OrderController::class, 'links'])->name('order.links')->middleware(['auth', 'verified','check']);
Route::get('order/destroy/{order}',                               [OrderController::class, 'destroy'])->name('order.destroy')->middleware(['auth', 'verified','check']);
Route::post('order/seller_change',                                [OrderController::class, 'seller_change'])->name('order.seller_change')->middleware(['auth', 'verified','check']);


Route::get('shipping/index/{order}',                               [ShippingController::class, 'index'])->name('shipping.index')->middleware(['auth', 'verified','check']);
Route::get('shipping/get_all/{order}',                             [ShippingController::class, 'get_all'])->name('shipping.get_all')->middleware(['auth', 'verified','check']);
Route::get('shipping/reverse/{order}',                             [ShippingController::class, 'reverse'])->name('shipping.reverse')->middleware(['auth', 'verified','check']);
Route::get('shipping/status/{order}',                              [ShippingController::class, 'status'])->name('shipping.status')->middleware(['auth', 'verified','check']);
Route::post('shipping/store/{order}',                              [ShippingController::class, 'store'])->name('shipping.store')->middleware(['auth', 'verified','check']);
Route::get('shipping/open',                                        [ShippingController::class, 'open'])->name('shipping.open')->middleware(['auth', 'verified','check']);
Route::post('shipping/update/{shipping}',                          [ShippingController::class, 'update'])->name('shipping.update')->middleware(['auth', 'verified','check']);
Route::get('shipping/add_item/{shipping}/{product}',               [ShippingController::class, 'add_item'])->name('shipping.add.item')->middleware(['auth', 'verified','check']);
Route::get('shipping/destroy_item/{shippingItems}',                [ShippingController::class, 'destroy_item'])->name('shipping.destroy.item')->middleware(['auth', 'verified','check']);
Route::get('shipping/print_shipping_address/{order}',              [ShippingController::class, 'print_shipping_address'])->name('print.shipping.address')->middleware(['auth', 'verified','check']);


Route::get('shipping/sigepe/index/{order}',                         [ShippingSigepeController::class, 'index'])->name('shipping.sigepe.index')->middleware(['auth', 'verified','check']);
Route::get('shipping/sigepe/create/{order}',                        [ShippingSigepeController::class, 'create'])->name('shipping.sigepe.create')->middleware(['auth', 'verified','check']);
Route::post('shipping/sigepe/store/{order}',                        [ShippingSigepeController::class, 'store'])->name('shipping.sigepe.store')->middleware(['auth', 'verified','check']);
Route::get('shipping/sigepe/edit/{order}',                          [ShippingSigepeController::class, 'edit'])->name('shipping.sigepe.edit')->middleware(['auth', 'verified','check']);
Route::post('shipping/sigepe/update/{order}',                       [ShippingSigepeController::class, 'update'])->name('shipping.sigepe.update')->middleware(['auth', 'verified','check']);


Route::get('shipping/reverse_logistic/index',                      [ShippingReverseLogisticController::class, 'index'])->name('shipping.reverse.logistic.index')->middleware(['auth', 'verified','check']);
Route::get('shipping/reverse_logistic/show/{order}',               [ShippingReverseLogisticController::class, 'show'])->name('shipping.reverse.logistic.show')->middleware(['auth', 'verified','check']);
Route::post('shipping/reverse_logistic/store/{order}',             [ShippingReverseLogisticController::class, 'store'])->name('shipping.reverse.logistic.store')->middleware(['auth', 'verified','check']);
Route::post('shipping/reverse_logistic/update/{reverse}',          [ShippingReverseLogisticController::class, 'update'])->name('shipping.reverse.logistic.update')->middleware(['auth', 'verified','check']);
Route::delete('shipping/reverse_logistic/destroy/{reverse}',       [ShippingReverseLogisticController::class, 'destroy'])->name('shipping.reverse.logistic.destroy')->middleware(['auth', 'verified','check']);



Route::get('sigepe/index',                                          [SigepeController::class, 'index'])->name('sigepe.index')->middleware(['auth', 'verified','check']);
Route::get('sigepe/create',                                         [SigepeController::class, 'create'])->name('sigepe.create')->middleware(['auth', 'verified','check']);
Route::post('sigepe/store',                                         [SigepeController::class, 'store'])->name('sigepe.store')->middleware(['auth', 'verified','check']);



Route::get('support/index',                                         [SupportController::class, 'index'])->name('support.index')->middleware(['auth', 'verified','check']);
Route::any('support/clients',                                       [SupportController::class, 'clients'])->name('support.clients')->middleware(['auth', 'verified','check']);
Route::get('support/seller/{id}',                                   [SupportController::class, 'seller'])->name('support.seller')->middleware(['auth', 'verified','check']);
Route::get('support/seller_date/{id}',                              [SupportController::class, 'seller_date'])->name('support.seller_date')->middleware(['auth', 'verified','check']);
Route::any('support/schedule/{id}',                                 [SupportController::class, 'schedule'])->name('support.schedule')->middleware(['auth', 'verified','check']);
Route::get('support/create/{lead}',                                 [SupportController::class, 'create'])->name('support.create')->middleware(['auth', 'verified','check']);
Route::post('support/store',                                        [SupportController::class, 'store'])->name('support.store')->middleware(['auth', 'verified','check']);
Route::get('support/edit/{id}',                                     [SupportController::class, 'edit'])->name('support.edit')->middleware(['auth', 'verified','check']);
Route::get('support/show/{id}',                                     [SupportController::class, 'show'])->name('support.show')->middleware(['auth', 'verified','check']);
Route::post('support/update/{id}',                                  [SupportController::class, 'update'])->name('support.update')->middleware(['auth', 'verified','check']);
Route::get('support/destroy/{id}',                                  [SupportController::class, 'destroy'])->name('support.destroy')->middleware(['auth', 'verified','check']);
Route::get('support/status/{id}',                                   [SupportController::class, 'status'])->name('support.status')->middleware(['auth', 'verified','check']);


Route::get('support_messages/index/{id}',                            [SupportMessagesController::class, 'index'])->name('support_messages.index')->middleware(['auth', 'verified','check']);
Route::get('support_messages/edit/{id}',                             [SupportMessagesController::class, 'edit'])->name('support_messages.edit')->middleware(['auth', 'verified','check']);
Route::post('support_messages/update/{id}',                          [SupportMessagesController::class, 'update'])->name('support_messages.update')->middleware(['auth', 'verified','check']);
Route::get('support_messages/change_status/{id}',                    [SupportMessagesController::class, 'change_status'])->name('support_messages.change_status')->middleware(['auth', 'verified','check']);

Route::get('lead/index',                                             [LeadController::class, 'status'])->name('lead.status')->middleware(['auth', 'verified','check']);
Route::get('lead/create',                                            [LeadController::class, 'create'])->name('lead.create')->middleware(['auth', 'verified','check']);
Route::get('lead/user/{id}',                                         [LeadController::class, 'user'])->name('lead.user')->middleware(['auth', 'verified','check']);
Route::post('lead/store',                                            [LeadController::class, 'store'])->name('lead.store')->middleware(['auth', 'verified','check']);
Route::get('lead/edit/{id}',                                         [LeadController::class, 'edit'])->name('lead.edit')->middleware(['auth', 'verified','check']);
Route::get('lead/show/{id}',                                         [LeadController::class, 'show'])->name('lead.show')->middleware(['auth', 'verified','check']);
Route::post('lead/update/{id}',                                      [LeadController::class, 'update'])->name('lead.update')->middleware(['auth', 'verified','check']);
Route::get('lead/destroy/{id}',                                      [LeadController::class, 'destroy'])->name('lead.destroy')->middleware(['auth', 'verified','check']);




Route::get('service/dashboard',                                         [ServiceController::class, 'dashboard'])->name('service.dashboard')->middleware(['auth', 'verified','check']);
Route::get('service/index',                                             [ServiceController::class, 'index'])->name('service.index')->middleware(['auth', 'verified','check']);
Route::any('service/user',                                              [ServiceController::class, 'user'])->name('service.user')->middleware(['auth', 'verified','check']);
Route::get('service/destroy/{component_id}/{service_id}',               [ServiceController::class, 'destroy'])->name('service.destroy')->middleware(['auth', 'verified','check']);
Route::get('service/summary/{id}',                                      [ServiceController::class, 'summary'])->name('service.summary')->middleware(['auth', 'verified','check']);
Route::get('service/full/{id}',                                         [ServiceController::class, 'full'])->name('service.full')->middleware(['auth', 'verified','check']);
Route::get('service/images/{id}',                                       [ServiceController::class, 'images'])->name('service.images')->middleware(['auth', 'verified','check']);


//serviços de vendas atuais
Route::get('service/sales/index',                                           [ServiceSalesController::class, 'index'])->name('service.sales.index')->middleware(['auth', 'verified','check']);
Route::any('service/sales/user',                                            [ServiceSalesController::class, 'user'])->name('service.sales.user')->middleware(['auth', 'verified','check']);
Route::get('service/sales/create/{user}',                                   [ServiceSalesController::class, 'create'])->name('service.sales.create')->middleware(['auth', 'verified','check']);
Route::post('service/sales/store',                                          [ServiceSalesController::class, 'store'])->name('service.sales.store')->middleware(['auth', 'verified','check']);
Route::any('service/sales/edit/{id}/{collection?}/{category?}',             [ServiceSalesController::class, 'edit'])->name('service.sales.edit')->middleware(['auth', 'verified','check']);
Route::post('service/sales/update/{id}',                                    [ServiceSalesController::class, 'update'])->name('service.sales.update')->middleware(['auth', 'verified','check']);

Route::get('service_items/sales/show/{id}',                                 [ServiceSalesItemsController::class, 'show'])->name('service_items.sales.show')->middleware(['auth', 'verified','check']);
Route::get('service_items/sales/add/{service_id}/{product_id}',             [ServiceSalesItemsController::class, 'add'])->name('service_items.sales.add')->middleware(['auth', 'verified','check']);
Route::any('service_items/sales/edit/{id}',                                 [ServiceSalesItemsController::class, 'edit'])->name('service_items.sales.edit')->middleware(['auth', 'verified','check']);
Route::post('service_items/sales/update/{id}',                              [ServiceSalesItemsController::class, 'update'])->name('service_items.sales.update')->middleware(['auth', 'verified','check']);
Route::get('service_items/sales/destroy/{id}/{service}',                    [ServiceSalesItemsController::class, 'destroy'])->name('service_items.sales.destroy')->middleware(['auth', 'verified','check']);


//serviços legados
Route::get('service/legacy/index',                                           [ServiceLegacyController::class, 'index'])->name('service.legacy.index')->middleware(['auth', 'verified','check']);
Route::any('service/legacy/user',                                            [ServiceLegacyController::class, 'user'])->name('service.legacy.user')->middleware(['auth', 'verified','check']);
Route::get('service/legacy/create/{user}',                                   [ServiceLegacyController::class, 'create'])->name('service.legacy.create')->middleware(['auth', 'verified','check']);
Route::post('service/legacy/store',                                          [ServiceLegacyController::class, 'store'])->name('service.legacy.store')->middleware(['auth', 'verified','check']);
Route::any('service/legacy/edit/{id}/{collection?}/{category?}',             [ServiceLegacyController::class, 'edit'])->name('service.legacy.edit')->middleware(['auth', 'verified','check']);
Route::post('service/legacy/update/{id}',                                    [ServiceLegacyController::class, 'update'])->name('service.legacy.update')->middleware(['auth', 'verified','check']);

Route::any('service_items/legacy/show/{id}/{collection?}/{category?}',       [ServiceLegacyItemsController::class, 'show'])->name('service_items.legacy.show')->middleware(['auth', 'verified','check']);
Route::get('service_items/legacy/add/{service_id}/{product_id}',             [ServiceLegacyItemsController::class, 'add'])->name('service_items.legacy.add')->middleware(['auth', 'verified','check']);
Route::any('service_items/legacy/edit/{id}',                                 [ServiceLegacyItemsController::class, 'edit'])->name('service_items.legacy.edit')->middleware(['auth', 'verified','check']);
Route::post('service_items/legacy/update/{id}',                              [ServiceLegacyItemsController::class, 'update'])->name('service_items.legacy.update')->middleware(['auth', 'verified','check']);
Route::get('service_items/legacy/destroy/{id}/{service}',                    [ServiceLegacyItemsController::class, 'destroy'])->name('service_items.legacy.destroy')->middleware(['auth', 'verified','check']);


//serviços externos

Route::get('service/external/index',                                           [ServiceExternalController::class, 'index'])->name('service.external.index')->middleware(['auth', 'verified','check']);
Route::any('service/external/user',                                            [ServiceExternalController::class, 'user'])->name('service.external.user')->middleware(['auth', 'verified','check']);
Route::get('service/external/create/{user}',                                   [ServiceExternalController::class, 'create'])->name('service.external.create')->middleware(['auth', 'verified','check']);
Route::post('service/external/store',                                          [ServiceExternalController::class, 'store'])->name('service.external.store')->middleware(['auth', 'verified','check']);
Route::any('service/external/edit/{id}/{category?}',                           [ServiceExternalController::class, 'edit'])->name('service.external.edit')->middleware(['auth', 'verified','check']);
Route::post('service/external/update/{id}',                                    [ServiceExternalController::class, 'update'])->name('service.external.update')->middleware(['auth', 'verified','check']);
Route::get('service/external/destroy/{component_id}/{service_id}',             [ServiceExternalController::class, 'destroy'])->name('service.external.destroy')->middleware(['auth', 'verified','check']);
Route::get('service/external/finished/{id}',                                   [ServiceExternalController::class, 'finished'])->name('service.external.finished')->middleware(['auth', 'verified','check']);


Route::get('service/external/summary/{id}',                                    [ServiceExternalController::class, 'summary'])->name('service.external.summary')->middleware(['auth', 'verified','check']);
Route::get('service/external/full/{id}',                                       [ServiceExternalController::class, 'full'])->name('service.external.full')->middleware(['auth', 'verified','check']);
Route::get('service/external/images/{id}',                                     [ServiceExternalController::class, 'images'])->name('service.external.images')->middleware(['auth', 'verified','check']);

Route::any('service_items/external/show/{id}/{category?}',                     [ServiceExternalItemsController::class, 'show'])->name('service_items.external.show')->middleware(['auth', 'verified','check']);
Route::get('service_items/external/add/{service_id}/{product_id}',             [ServiceExternalItemsController::class, 'add'])->name('service_items.external.add')->middleware(['auth', 'verified','check']);
Route::any('service_items/external/edit/{id}',                                 [ServiceExternalItemsController::class, 'edit'])->name('service_items.external.edit')->middleware(['auth', 'verified','check']);
Route::post('service_items/external/update/{id}',                              [ServiceExternalItemsController::class, 'update'])->name('service_items.external.update')->middleware(['auth', 'verified','check']);
Route::get('service_items/external/destroy/{id}/{service}',                    [ServiceExternalItemsController::class, 'destroy'])->name('service_items.external.destroy')->middleware(['auth', 'verified','check']);


Route::any('jewel/external/index/{collection?}/{category?}',                    [JewelExternalController::class, 'index'])->name('jewel.external.index')->middleware(['auth', 'verified','check']);
Route::get('jewel/external/create',                                             [JewelExternalController::class, 'create'])->name('jewel.external.create')->middleware(['auth', 'verified','check']);
Route::post('jewel/external/store',                                             [JewelExternalController::class, 'store'])->name('jewel.external.store')->middleware(['auth', 'verified','check']);
Route::get('jewel/external/edit/{jewel}',                                       [JewelExternalController::class, 'edit'])->name('jewel.external.edit')->middleware(['auth', 'verified','check']);
Route::post('jewel/external/update/{jewel}',                                    [JewelExternalController::class, 'update'])->name('jewel.external.update')->middleware(['auth', 'verified','check']);
Route::get('jewel/external/destroy/{jewel}',                                    [JewelExternalController::class, 'destroy'])->name('jewel.external.destroy')->middleware(['auth', 'verified','check']);

Route::get('jewel/external/images/index/{jewel}',                               [JewelExternalController::class, 'images'])->name('jewel.external.images.index')->middleware(['auth', 'verified','check']);
Route::post('jewel/external/image/store/{jewel}',                               [JewelExternalController::class, 'imageStore'])->name('jewel.external.image.store')->middleware(['auth', 'verified','check']);
Route::get('jewel/external/image_destroy/{image}',                              [JewelExternalController::class, 'imageDestroy'])->name('jewel.external.image.destroy')->middleware(['auth', 'verified','check']);

Route::post('jewel/external/price_change/{jewel}',                              [JewelExternalController::class, 'price_change'])->name('jewel.external.price.change')->middleware(['auth', 'verified','check']);
Route::post('jewel/external/price_store/{jewel}',                               [JewelExternalController::class, 'price_store'])->name('jewel.external.price.store')->middleware(['auth', 'verified','check']);
Route::get('jewel/external/image/download/{id}',                                [JewelExternalImageController::class, 'download'])->name('jewel.external.image.download')->middleware(['auth', 'verified','check']);


Route::get('report/index',                                                      [ReportController::class, 'index'])->name('report.index')->middleware(['auth', 'verified','check']);
Route::get('report/product',                                                    [ReportController::class, 'product'])->name('report.product')->middleware(['auth', 'verified','check']);
Route::get('report/collection',                                                 [ReportController::class, 'collection'])->name('report.collection')->middleware(['auth', 'verified','check']);
Route::get('report/category',                                                   [ReportController::class, 'category'])->name('report.category')->middleware(['auth', 'verified','check']);
Route::get('report/client',                                                     [ReportController::class, 'client'])->name('report.client')->middleware(['auth', 'verified','check']);
Route::get('report/seller',                                                     [ReportController::class, 'seller'])->name('report.seller')->middleware(['auth', 'verified','check']);
Route::get('report/position',                                                   [ReportController::class, 'position'])->name('report.position')->middleware(['auth', 'verified','check']);
Route::get('report/state',                                                      [ReportController::class, 'state'])->name('report.state')->middleware(['auth', 'verified','check']);
Route::get('report/city',                                                       [ReportController::class, 'city'])->name('report.city')->middleware(['auth', 'verified','check']);
Route::get('report/center',                                                     [ReportController::class, 'center'])->name('report.center')->middleware(['auth', 'verified','check']);


////serviços externos
//
//Route::get('service/external/index',                                           [ServiceExternalController::class, 'index'])->name('service.external.index');
//Route::any('service/external/user',                                            [ServiceExternalController::class, 'user'])->name('service.external.user');
//Route::get('service/external/create/{user}',                                   [ServiceExternalController::class, 'create'])->name('service.external.create');
//Route::post('service/external/store',                                          [ServiceExternalController::class, 'store'])->name('service.external.store');
//Route::any('service/external/edit/{id}/{collection?}/{category?}',             [ServiceExternalController::class, 'edit'])->name('service.external.edit');
//Route::post('service/external/update/{id}',                                    [ServiceExternalController::class, 'update'])->name('service.external.update');
//Route::get('service/external/{component_id}/{service_id}',                     [ServiceExternalController::class, 'destroy'])->name('service.external.destroy');
//
//Route::get('service/external/summary/{id}',                                    [ServiceExternalController::class, 'summary'])->name('service.external.summary');
//Route::get('service/external/full/{id}',                                       [ServiceExternalController::class, 'full'])->name('service.external.full');
//Route::get('service/external/images/{id}',                                     [ServiceExternalController::class, 'images'])->name('service.external.images');
//
//Route::any('service_items/external/show/{id}/{collection?}/{category?}',       [ServiceExternalItemsController::class, 'show'])->name('service_items.external.show');
//Route::get('service_items/external/add/{service_id}/{product_id}',             [ServiceExternalItemsController::class, 'add'])->name('service_items.external.add');
//Route::any('service_items/external/edit/{id}',                                 [ServiceExternalItemsController::class, 'edit'])->name('service_items.external.edit');
//Route::post('service_items/external/update/{id}',                              [ServiceExternalItemsController::class, 'update'])->name('service_items.external.update');
//Route::get('service_items/external/destroy/{id}/{service}',                    [ServiceExternalItemsController::class, 'destroy'])->name('service_items.external.destroy');
//
//
//Route::any('jewel/external/index/{collection?}/{category?}',                    [JewelExternalController::class, 'index'])->name('jewel.external.index');
//Route::get('jewel/external/create',                                             [JewelExternalController::class, 'create'])->name('jewel.external.create');
//Route::post('jewel/external/store',                                             [JewelExternalController::class, 'store'])->name('jewel.external.store');
//Route::get('jewel/external/edit/{jewel}',                                       [JewelExternalController::class, 'edit'])->name('jewel.external.edit');
//Route::post('jewel/external/update/{jewel}',                                    [JewelExternalController::class, 'update'])->name('jewel.external.update');
//Route::get('jewel/external/destroy/{jewel}',                                    [JewelExternalController::class, 'destroy'])->name('jewel.external.destroy');
//
//Route::get('jewel/external/images/index/{jewel}',                               [JewelExternalController::class, 'images'])->name('jewel.external.images.index');
//Route::post('jewel/external/image/store/{jewel}',                               [JewelExternalController::class, 'imageStore'])->name('jewel.external.image.store');
//Route::get('jewel/external/image_destroy/{image}',                              [JewelExternalController::class, 'imageDestroy'])->name('jewel.external.image.destroy');
//
//Route::post('jewel/external/price_change/{jewel}',                              [JewelExternalController::class, 'price_change'])->name('jewel.external.price.change');
//Route::post('jewel/external/price_store/{jewel}',                               [JewelExternalController::class, 'price_store'])->name('jewel.external.price.store');
//Route::get('jewel/external/image/download/{id}',                                [JewelExternalImageController::class, 'download'])->name('jewel.external.image.download');
//

Route::get('image/download/{id}',                                    [ImageController::class, 'download'])->name('image.download');

require __DIR__.'/auth.php';
