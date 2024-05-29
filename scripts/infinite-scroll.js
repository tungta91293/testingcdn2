$(function() {

    var postData,
        isFetchingPosts = false,
        isFetchButtonClicked = false,
        postsToLoad = 9;

    // Load the JSON file containing all URLs
    $.getJSON('/js/post-data.json', function(data) {
        postData = data["posts"];
        // If there aren't any more posts available to load than already visible, disable fetching
        if (postData.length <= postsToLoad) {
            disableFetching();
        }
    });

    // If there's no spinner, it's not a page where posts should be fetched
    if ($(".infinite-spinner").length < 1)
        isFetchingPosts = false;

    // Load more post on button click
    $('.article-list__load-more').click(function () {
        var totalLoadedPosts = $(".post-list").children().length;
        if (postData.length <= totalLoadedPosts) {
            $('.article-list__load-more').fadeOut();
            isFetchButtonClicked = true;
            disableFetching();
        }

        if(!isFetchButtonClicked) {
            isFetchButtonClicked = true;
            $(".infinite-spinner").fadeIn();
            fetchPosts();
        }
    });

    // Fetch a chunk of posts
    function fetchPosts() {
        // Exit if postData haven't been loaded
        if (!postData) return;

        isFetchingPosts = true;

        // Load as many posts as there were present on the page when it loaded
        // After successfully loading a post, load the next one
        var loadedPosts = 0,
        postCount = $(".post-list").children().length,
        callback = function() {
            loadedPosts++;
            var postIndex = postCount + loadedPosts;

            if (postIndex > postData.length-1) {
                disableFetching();
                isFetchButtonClicked = false;
                return;
            }

            if (loadedPosts < postsToLoad) {
                setTimeout(function () {
                    fetchPostWithIndex(postIndex, callback);
                }, 500);
            } else {
                isFetchButtonClicked = false;
                disableFetching();
            }
        };

        fetchPostWithIndex(postCount + loadedPosts, callback);
    }

    function fetchPostWithIndex(index, callback) {
        var currentPost = postData[index];
        var postToAppend = '';

        if (currentPost.isPillarPost) {
            postToAppend = '<div class="col-lg-8 col-12 px-3 article-list__item-pillar mb-5">' +
                                '<article class="article-list__item">' +
                                    '<a href="' + currentPost.postUrl +'" class="article-list__item__header">' +
                                        '<span class="banner-overlay"></span>' +
                                        '<img class="img-fluid" src="' + currentPost.postThumb +'" alt="' + currentPost.postTitle +' thumbnail">' +
                                    '</a>' +
                                    '<h2 class="text-left pt-0 article-list__item__title"><a href="' + currentPost.postUrl +'">' + currentPost.postTitle +'</a></h2>' +
                                    '<a href="/blog/' + currentPost.postTopicUrl +'/" class="article-list__item__category">' + currentPost.postStrapLine +'</a>' +
                                    '<a href="' + currentPost.postUrl +'" class="article-list__item-pillar-link">Read More <i class="breadcrumb__icon"></i></a>' +
                                '</article>' +
                            '</div>';
        } else {
            postToAppend = '<div class="col-lg-4 col-md-6 col-12 px-3 mb-5">' +
                                '<article class="article-list__item">' +
                                    '<a href="' + currentPost.postUrl +'" class="article-list__item__header">' +
                                        '<img src="' + currentPost.postThumb +'" alt="' + currentPost.postTitle +' thumbnail">' +
                                    '</a>' +
                                    '<div class="article-list__item__body">';

            if (currentPost.postTopic != "") {
                postToAppend +=         '<h2 class="text-left pt-0 article-list__item__title"><a href="' + currentPost.postUrl +'">' + currentPost.postTitle +'</a></h2>' +
                                        '<a href="/blog/' + currentPost.postTopicUrl +'/" class="article-list__item__category">' + currentPost.postStrapLine +'</a>';
            } else {
                postToAppend +=         '<h2 class="text-left pt-0 article-list__item__title"><a href="' + currentPost.postUrl +'">' + currentPost.postTitle +'</a></h2>';
            }

            // if (currentPost.postCategoryUrl != "blog") {
            //     postToAppend +=         '<a href="/blog/' + currentPost.postCategoryUrl +'/" class="article-list__item__category">' + currentPost.postCategory +'</a>';
            // }

            postToAppend +=         '</div>' +
                                '</article>' +
                            '</div>'
        }

        $('.post-list').append(postToAppend);
        callback();
    }

    function disableFetching() {
        isFetchingPosts = false;
        $(".infinite-spinner").fadeOut();
    }

});
