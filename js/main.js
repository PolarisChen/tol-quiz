
/* Quiz */
var questions = [{
    desc: 'When light from an object reaches our eyes, which part(s) of the eye refracts the light?',
    image: '',
    options: [
      {
        desc: 'Cornea and Lens',
        correct: true,
        feedback: 'Correct! When light from an object reaches our eyes, the cornea and lens refracts the light.'
      },
      {
        desc: 'Retina',
        correct: false,
        feedback: 'Ooops! Retina does not refract light, it is where light gets focused in a person who has perfect vision.'
      },
      {
        desc: 'Glass',
        correct: false,
        feedback: 'Ooops! Light enters the eye through the pupil, but pupil does not refracts light.'
      }
    ]
  }, {
    desc: 'In order to have perfect vision, where does light need to be focused in the eye?',
    image: '',
    options: [
      {
        desc: 'In between lens and retina',
        correct: false,
        feedback: 'Ooops! When light gets focused before the retina, the person will have a blurry vision.'
      },
      {
        desc: 'Cornea and Lens',
        correct: false,
        feedback: 'Ooops! Cornea and lens are where light gets refracted, not where light gets focused in order to have perfect vision.'
      },
      {
        desc: 'Retina',
        correct: true,
        feedback: 'Good job! In a person who has perfect vision, the refracted light is actually focused on the retina.'
      }
    ]
  }, {
    desc: 'When light gets focused before the retina, what will it cause?',
    image: '',
    options: [
      {
        desc: 'Hyperopia and hypermetropia',
        correct: false,
        feedback: 'Ooops! When light gets focused before the retina, the person will have a blurry vision.'
      },
      {
        desc: 'Myopia',
        correct: true,
        feedback: 'Good job! Myopia is also called nearsightedness, which causes blurry vision when looking at distant objects.'
      },
      {
        desc: 'Farsightedness',
        correct: false,
        feedback: 'Ooops! Farsightedness is also called hyperopia or hypermetropia, which is the defect when light gets focused behind the retina.'
      }
    ]
  }];

function buildOption(op, i) {
  var feedback = op.correct ? 'correct' : 'wrong';
  var nums = ['A', 'B', 'C', 'D'];
  var num = nums[i];
  return '<div class="frame option" data-next="#scene-' + feedback + '">\
    <p>' + num + '. ' + op.desc + '</p>\
  </div>';
}

var current = 0;

function loadQuestion() {
  console.log('LOAD Q' + (current + 1));

  var p = questions[current++];
  $('#scene-question h2').text('Question ' + current);
  $('#scene-question p').text(p.desc);
  if (p.image.length > 0) {
    $('#scene-question p').append('<img src="images/' + p.image + '" alt="">');
  }
  $('#scene-question .btn-continue').addClass('btn-disabled');
  $('#scene-question .select').empty();
  p.options.forEach(function(option, i) {
    // console.log(option, i);
    $('#scene-question .select').append(buildOption(option, i));
    if (option.correct) {
      $('#scene-correct p').text(option.feedback);
    } else {
      $('#scene-wrong p').text(option.feedback);
    }
  });
}

/* Scene */

function hideBoard() {
  $('.scene').hide();
  $('#board').hide();
}
function showBoard() {
  $('.scene').hide();
  $('#board').show();
}

function startScene(scene) {
  $(scene).fadeIn();
}
function continueScene(el) {
  var next = $(el).data('next');
  console.log(next);
  $(el).parent('.scene').fadeOut(function () {
    $(next).fadeIn();
  });
}
function showScene(target, prep) {
  var $scene = $('.scene:visible');
  if ($scene.length == 0) {
    console.log('SHOW', target);
    if (prep) {
      prep();
    }
    $(target).show();
  } else {
    $('.scene:visible').fadeOut(function () {
      console.log('FADE IN', target);
      if (prep) {
        prep();
      }
      $(target).fadeIn();
    });
  }
}

$(document).ready(function () {
  loadQuestion();

  showBoard();
  $('#scene-start').show();

  $('.btn-continue').click(function () {
    if (!$(this).hasClass('btn-disabled')) {
      continueScene(this);
    }
  })
  $('.btn-next-question').click(function () {
    if (current == questions.length) {
      showScene('#scene-end');
    } else {
      showScene('#scene-question', loadQuestion);
    }
  })
  $('.btn-share').click(function () {
    var url = "https://polarischen.github.io/tol-quiz/";
    var text = "Do you take a data-driven quiz? Check this out! 😏";
    var twitterWindow = window.open('https://twitter.com/share?url=' + url + '&text=' + text, 'twitter-popup', 'height=350, width=600');
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
  })
  $('.select').on('click', '.option', function () {
    var $select = $(this).parent('.select');
    if (!$select.hasClass('select-disabled')) {
      $select.find('.option').removeClass('option-selected');
      $(this).addClass('option-selected');

      var $btn = $select.parent('.scene').children('a');
      $btn.removeClass('btn-disabled');

      var next = $(this).data('next');
      if (next) {
        var target = $select.data('target');
        var $btnTarget = $(target).children('a');
        $btnTarget.data('next', next);
      }
    }
  })
  $('.input-answer').on('change keyup paste', function() {
    var $btn = $(this).parent('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })
})
