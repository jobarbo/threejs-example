<?php
/*
Template Name: Internet Explorer
*/
?>

<!-- Getting the header -->
<?php get_header(); ?>

<!-- Start Internet Explorer Page -->
<?php
$sub_title = get_field("sub_title");
$title = get_field("title");
$button = get_field("button");
?>
<section id="section-error">
    <div class="container error">
        <div class="error__info">
            <p class="error__subtitle">
                <?php echo $sub_title ?>
            </p>
            <h2 class="error__title">
                <?php echo $title ?>
            </h2>
        </div>
        <div class="error__action">
            <p class="error__label"> <?= $button['title'] ?></p>
            <a href="<?= $button['url']; ?>" class="error__button"></a>
        </div>

    </div>
</section>
<!-- End Internet Explorer Page -->

<!-- Getting the footer -->
<?php get_footer(); ?>