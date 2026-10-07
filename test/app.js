'use strict';
(()=>{
  const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
  const types=['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
  const typeProfiles={"ISTJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들을 때는 “좋아질 거예요”라는 말보다, 지금 갖춰진 조건에서 무엇이 어떻게 달라지는지에 먼저 눈길이 갈 수 있어요. 그런데 설명에 빠진 세부 사항만 짚다 보면, 정작 어떤 문제를 풀려고 꺼낸 이야기인지는 놓칠 수 있죠.","sourceId":"W010.ISTJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"일이나 계획을 고를 때, 내 시간과 준비로 꾸준히 해나갈 수 있는 쪽에 마음이 갈 수 있어요. 고른 뒤에도 감당할 수 있느냐가 중요한 거죠. 무리 없는 선택을 찾는 데만 집중하다 보면, 정작 내가 하고 싶은 일인지는 덜 살필 수 있어요.","sourceId":"W010.ISTJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 어느 말을 서로 다르게 이해했는지부터 짚으며 오해를 풀고 싶어질 수 있어요. 그런데 있었던 일을 설명하는 데 힘을 쏟다 보면, 상대가 왜 불편했는지 듣기보다 내 말이 맞다는 얘기만 하는 것처럼 들릴 수 있죠.","sourceId":"W010.ISTJ.PEOPLE_RESPONSE.02"}],"ISFJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면, 그걸 쓰는 사람이 평소 하던 일을 얼마나 편하게 이어갈 수 있을지 먼저 살펴볼 수 있어요. 다만 익숙한 순서가 바뀌는 데 마음이 쏠리면, 새 방식으로 줄어드는 수고는 덜 보일 수 있죠.","sourceId":"W010.ISFJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"함께 쓸 물건이나 나눠 할 일을 정할 때, 나만 편한 방법보다는 다른 사람도 불편하지 않을 방법이 더 끌릴 수 있어요. 그런데 “다들 괜찮을까?”를 먼저 따지다 내 취향이나 바람은 뒤로 빼놓을 때가 있죠.","sourceId":"W010.ISFJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 내가 무심코 한 말이 걸렸던 건 아닐지 먼저 돌아볼 수 있어요. 상대를 더 불편하게 하고 싶지 않아 미안하다는 말이 먼저 나오면, 정작 무엇을 다르게 이해했는지 듣기 전에 내 잘못으로 받아들일 수 있죠.","sourceId":"W010.ISFJ.PEOPLE_RESPONSE.02"}],"INFJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새로운 제안을 들으면 ‘이걸 왜 하려는 걸까? 앞으로는 어떻게 달라질까?’부터 떠올릴 수 있어요. 큰 방향을 그려보는 동안, 당장 필요한 조건은 미처 못 볼 때도 있죠.","sourceId":"W010.INFJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"편리하거나 좋아 보인다는 이유만으로 마음이 정해지지 않을 때가 있어요. 내가 중요하게 여기는 것과 맞는지 먼저 살피는 편이죠. 그만큼 시간이나 비용 같은 조건은 나중에 확인하게 될 수 있어요.","sourceId":"W010.INFJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"불편한 말을 들어도 ‘왜 저렇게 말했을까?’를 먼저 생각하게 될 수 있어요. 상대의 사정을 헤아리는 동안 정작 내 마음은 뒤로 미뤄두기도 하죠. 그러다 불편했던 점을 한참 뒤에 꺼낼 수 있어요.","sourceId":"W010.INFJ.PEOPLE_RESPONSE.02"}],"INTJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면, 그걸 받아들였을 때 뒤에 이어질 일도 같은 방식에 맞춰야 할지 먼저 눈여겨볼 수 있어요. 다만 전체 계획에 들어맞는지만 살피다 보면, 작게 따로 써볼 만한 제안은 지나칠 수 있죠.","sourceId":"W010.INTJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"지금 조금 번거롭더라도, 같은 문제로 다시 손이 가지 않을 방법이 더 끌릴 수 있어요. 다만 오래 쓸 방식을 찾는 데 마음이 쏠리면, 지금 필요한 정도보다 복잡하거나 큰 선택을 할 수도 있죠.","sourceId":"W010.INTJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 서로 바라는 게 다른 건지 같은 일을 다르게 판단하는 건지부터 짚고 싶어질 수 있어요. 그런데 그 이유를 하나씩 묻다 보면, 상대는 불편했던 마음까지 설명해서 납득시켜야 하는 것처럼 느낄 수 있죠.","sourceId":"W010.INTJ.PEOPLE_RESPONSE.02"}],"ISTP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새로운 제안을 들으면, “그래서 실제로는 어떻게 되는 거지?” 하는 부분부터 눈에 들어올 수 있어요. 어떤 과정을 거쳐 그렇게 되는지 궁금해지는 거죠. 그 방식을 알아보는 데만 집중하면, 이걸 누가 왜 필요로 하는지는 덜 들을 수 있습니다.","sourceId":"W010.ISTP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"일이나 계획을 고를 때, 지금 필요한 일을 덜 번거롭게 해주는 쪽에 마음이 갈 수 있어요. 그런데 당장의 불편이 줄어든다는 점이 크게 보이면, 그 방법을 계속 쓰면서 챙겨야 할 일은 덜 따져볼 수 있죠.","sourceId":"W010.ISTP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 지금 무엇을 바꾸면 나아질지부터 찾고 싶어질 수 있어요. “그럼 이 부분을 바꾸면 되겠다” 하며 해결할 방법을 짚는 식이죠. 그런데 상대는 불편했던 마음을 알아주길 바라는 중일 수도 있어서, 방법부터 이야기하면 그 얘기는 끝내자는 뜻처럼 들릴 수 있어요.","sourceId":"W010.ISTP.PEOPLE_RESPONSE.02"}],"ISFP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면, 설명에 적힌 장점보다 보여주는 예가 어떻게 다가오는지 먼저 살필 수 있어요. 한 장면이 마음에 들거나 걸리면 그 인상이 오래 남아, 제안 전체가 같은 느낌일 거라고 받아들일 수도 있죠.","sourceId":"W010.ISFP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"조건이 좋아도 내가 원하지 않는 방식을 계속 따라야 한다면 마음이 덜 갈 수 있어요. 내 마음을 거스르지 않는 쪽을 고르고 싶은 거죠. 다만 한 부분이 싫다는 느낌이 크면, 그 부분을 바꿔서 괜찮게 쓸 수 있는 선택까지 통째로 접어둘 수 있습니다.","sourceId":"W010.ISFP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 마음에 없는 말까지 나올까 봐 잠깐 말을 줄일 수 있어요. 내 기분을 가라앉힌 뒤 다시 이야기하고 싶은 거죠. 다만 잠시 멈춘다는 뜻이 전해지지 않으면, 상대는 더 이야기할 생각이 없는 줄 알 수 있습니다.","sourceId":"W010.ISFP.PEOPLE_RESPONSE.02"}],"INFP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새로운 방법을 들으면 그 안에 내 생각을 어떻게 담을 수 있을지 눈길이 가요. 그러다 마음속에 그린 모습이 제안의 일부처럼 느껴질 때도 있죠. 설명에 있던 내용과 내가 덧붙여 본 쓰임은 다를 수 있어요.","sourceId":"W010.INFP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"조건이 괜찮아도 내가 왜 이걸 고르는지 설명되지 않으면 선뜻 마음이 가지 않아요. 작은 부분이 마음에 걸릴 때는 선택 전체가 내 생각과 어긋나는 것처럼 느껴지기도 하죠. 필요한 부분을 받아들이는 일과 모든 점에 찬성하는 일은 같지 않아요.","sourceId":"W010.INFP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"그런 뜻으로 한 말이 아닌데 대화가 불편해지면, 원래 전하고 싶었던 마음부터 설명하고 싶어져요. 내 뜻이 잘못 전해진 부분이 신경 쓰이는 거죠. 그러다 상대에게는 어떤 말이 걸렸는지 듣는 시간이 짧아질 수 있어요.","sourceId":"W010.INFP.PEOPLE_RESPONSE.02"}],"INTP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면, 설명 속 “쉽다”가 누구에게 어느 정도 쉬운 건지 먼저 궁금해질 수 있어요. 같은 말을 서로 다르게 받아들이고 있지는 않은지 따져보는 거죠. 그러다 아직 대략 소개하는 말까지 뜻을 꼭 정하려 하면, 제안 내용보다 단어를 설명하는 데 대화가 머물 수 있어요.","sourceId":"W010.INTP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"설명에 자꾸 예외를 붙이지 않아도 앞뒤가 맞는 방법에 마음이 갈 수 있어요. 같은 기준으로 납득할 수 있는지가 중요한 거죠. 다만 설명이 깔끔한 것과 실제로 쓰기 편한 건 달라서, 사용하면서 생길 번거로움은 덜 따져볼 수 있어요.","sourceId":"W010.INTP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면, 바로 내 입장을 말하기보다 그 일을 조금 떨어져서 설명해보려 할 수 있어요. “누가 이런 말을 들었다고 생각해보면…” 하며 다른 경우에 빗대는 식이죠. 그런데 상대에게는 지금 두 사람 사이의 이야기가 예시로 바뀌면서, 내가 어떻게 받아들였는지는 빠진 대답처럼 들릴 수 있어요.","sourceId":"W010.INTP.PEOPLE_RESPONSE.02"}],"ESTP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안에서는 이 부분을 바꾸면 무엇이 달라지는지가 먼저 눈에 들어와요. 차이가 선명할수록 그대로 지켜야 하는 조건은 배경처럼 지나갈 수 있죠.","sourceId":"W010.ESTP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"처음 정한 대로만 써야 하는 것보다 상황에 맞춰 조정할 수 있는 선택이 편하게 다가와요. 바꿀 수 있는 부분이 많아 보이면, 그 안에서도 꼭 그대로여야 하는 조건은 작게 느껴질 수 있죠.","sourceId":"W010.ESTP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 딱딱해지면 조금 가볍게 말을 걸며 다시 이어갈 틈을 찾기도 해요. 웃으며 답할 수 있는 분위기가 돌아와도, 처음 불편했던 이야기는 그대로 남아 있을 수 있어요.","sourceId":"W010.ESTP.PEOPLE_RESPONSE.02"}],"ESFP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면 직접 해보는 장면부터 눈앞에 그려져요. 그 장면이 생생할수록 뒤에서 어떤 조건이 받쳐줘야 하는지는 덜 눈에 들어올 수 있죠.","sourceId":"W010.ESFP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"실제로 쓰거나 참여하는 모습이 마음에 들면 선택에도 마음이 움직여요. 조건만 보기보다 그 안에서 어떤 시간을 보낼지가 중요한 거죠. 다만 처음이라 새롭게 느껴지는 재미와 평소에도 원하던 쓰임은 다를 수 있어요.","sourceId":"W010.ESFP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"불편해진 대화에서도 따뜻한 말을 건네며 다시 가까이 이야기할 틈을 찾기도 해요. 다정한 답이 돌아오면 어려운 이야기도 이어갈 수 있겠다는 마음이 들죠. 상대에게는 편하게 답하는 것과 그 내용을 다시 꺼내는 것이 다른 단계일 수 있어요.","sourceId":"W010.ESFP.PEOPLE_RESPONSE.02"}],"ENFP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새로운 제안이나 아이디어를 접하면, “이걸로 뭘 더 해볼 수 있을까?” 하며 아직 없는 모습까지 그려볼 수 있어요. 그러다 지금 가능한 것과 조건이 갖춰져야 가능한 것을 한데 생각할 때가 있죠.","sourceId":"W010.ENFP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"조건이 좋아 보여도 내가 왜 이걸 하려는지 납득돼야 마음이 움직일 수 있어요. 의미가 크게 느껴지는 일은 번거롭더라도 해보고 싶어지는데, 그 마음에 비해 실제로 들일 시간과 수고는 덜 따져볼 수 있죠.","sourceId":"W010.ENFP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 어색해지면, 상대가 받아들이기 쉬운 말을 찾으며 다시 편하게 이야기하고 싶어질 수 있어요. 그런데 분위기를 풀려고 말을 고르다 보면, 정작 내가 불편했던 점은 말하지 못한 채 넘어갈 수도 있죠.","sourceId":"W010.ENFP.PEOPLE_RESPONSE.02"}],"ENTP":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 보면 당연하게 둔 조건을 바꾸면 어떨지 먼저 궁금해져요. 예외적인 쓰임이 눈에 들어오면, 원래 어떤 경우에 쓰려고 나온 제안인지는 뒤로 갈 수 있죠.","sourceId":"W010.ENTP.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"한 가지로만 쓰는 것보다 다른 방식으로도 바꿔 볼 수 있는 선택에 마음이 가요. 가능성이 많으면 더 쓸모 있게 느껴지죠. 그중 지금 필요한 쓰임은 얼마인지보다 앞으로 바꿔 볼 여지가 크게 보일 수 있어요.","sourceId":"W010.ENTP.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 어긋나면 반대의 경우에도 같은 뜻인지 물어보고 싶어져요. 차이가 어디에 있는지 알아보려는 거죠. 하지만 상대는 자기 이야기를 이해받기보다 말이 맞는지 시험받는다고 느낄 수 있어요.","sourceId":"W010.ENTP.PEOPLE_RESPONSE.02"}],"ESTJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면 무엇을 어디까지 맡는 일인지 먼저 궁금해져요. 그런데 아직 생각을 나누는 단계라면 역할이나 완료 기준까지 정해져 있지는 않을 수 있죠. 그 빈자리가 곧 준비 안 된 제안이라는 뜻은 아니에요.","sourceId":"W010.ESTJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"무엇을 얻고 어디까지 챙겨야 하는지 분명한 선택에 마음이 가요. 고른 뒤 잘 맞았는지 확인할 기준도 중요하죠. 그 기준을 세우기 어려운 쓰임이나 만족은 비교표에서 작게 남을 수 있어요.","sourceId":"W010.ESTJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 어긋나면 무엇을 약속했고 어떤 기준으로 볼지 먼저 짚고 싶어져요. 나에게는 분명한 기준이어도 상대가 같은 기준에 동의한 것은 아닐 수 있죠. 그 차이가 남아 있으면 설명을 더해도 같은 이야기가 맴돌 수 있어요.","sourceId":"W010.ESTJ.PEOPLE_RESPONSE.02"}],"ESFJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 보면 처음 듣는 사람도 뭘 하면 되는지 알 수 있을까 하는 점이 눈에 들어와요. 다만 나에게 익숙한 말은 설명이 더 필요하지 않은 것처럼 지나갈 수 있죠.","sourceId":"W010.ESFJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"함께 고르는 일에서는 지금 서로 맞추기 쉬운 쪽에 마음이 가요. 다 같이 쓰거나 진행하기 편하다는 점이 중요하니까요. 다만 지금 조율이 쉬운 방식이 계속 유지하기도 편한 것은 아닐 수 있어요.","sourceId":"W010.ESFJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면 서로 편하게 나눌 수 있는 공통 이야기가 떠오르기도 해요. 다시 고개를 끄덕이는 장면이 생기면 마음도 조금 놓이죠. 그렇지만 그 공감이 처음의 의견 차이까지 줄였다는 뜻은 아닐 수 있어요.","sourceId":"W010.ESFJ.PEOPLE_RESPONSE.02"}],"ENFJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안에서는 각자가 자기 생각을 보탤 자리가 있는지 먼저 눈에 들어와요. 누군가에게 잘 맞을 듯한 역할이 보여도, 그 사람이 해보고 싶은 방식까지 알게 된 것은 아닐 수 있죠.","sourceId":"W010.ENFJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"함께 고르는 일에서는 각자 왜 함께할 만한지 보이는 선택에 마음이 가요. 참여할 이유가 충분하게 느껴져도 그 이유를 모두가 중요하게 여기는 것은 아닐 수 있죠.","sourceId":"W010.ENFJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 불편해지면 양쪽이 왜 그렇게 말했는지 알아들을 수 있게 정리하고 싶어져요. 서로 이해된다는 답이 나오면 해결 방향도 가까워진 듯 느껴질 수 있죠. 이유를 이해한 것과 같은 방법으로 풀기로 한 것은 아직 다를 수 있어요.","sourceId":"W010.ENFJ.PEOPLE_RESPONSE.02"}],"ENTJ":[{"title":"새 제안에서 먼저 떠오르는 생각","description":"새 제안을 들으면 지금 막힌 부분을 어떻게 바꿀 수 있는지부터 눈길이 가요. 큰 문제에 닿지 않는다고 느끼면, 따로 줄여 줄 수 있는 작은 불편은 덜 보일 수 있죠.","sourceId":"W010.ENTJ.PERCEPTION.01"},{"title":"선택에서 끌리는 부분","description":"고른 뒤 목표에 무엇이 달라지는지가 선택을 움직이는 기준이 돼요. 눈에 띄게 앞으로 가는 선택이 아니라면 작게 느껴질 수 있죠. 지금 상태를 유지하거나 기다리는 수고를 줄여 주는 쓰임도 있는데 말이에요.","sourceId":"W010.ENTJ.JUDGMENT.01"},{"title":"대화가 불편할 때의 반응","description":"대화가 어긋나면 결국 어떤 결과를 원하는지부터 맞춰 보고 싶어져요. 목표가 같다는 답을 들으면 차이도 많이 줄어든 듯 느껴지죠. 하지만 그 결과에 이르는 방법까지 같은 마음으로 받아들이는 것은 아닐 수 있어요.","sourceId":"W010.ENTJ.PEOPLE_RESPONSE.02"}]};
  const domains={OVERALL:'총운',RELATIONSHIP:'인간관계',ROMANCE:'연애',WORK:'일·학업',MONEY:'재물',CONDITION:'컨디션'};
  const sections={STRUCTURE:'사주의 기본 구성',TEMPERAMENT:'기본 성향',STRENGTH:'강점',RELATION:'관계',WORK:'일·학업',MONEY:'재물',ROMANCE:'연애',RHYTHM:'생활 리듬'};
  const blocks={SUMMARY:'사주와 MBTI 함께 보기',STRENGTH:'강점 활용',RELATION:'관계',WORK:'일·학업',ROMANCE:'연애',STRESS:'스트레스 돌보기',RHYTHM:'생활 리듬'};
  const warnings={INVALID_DATE:'존재하는 날짜인지 확인해주세요. 음력은 해당 달의 실제 날짜 수를 확인해요.',INVALID_LEAP_MONTH:'입력한 연도·월에는 해당 윤달이 없어요. 음력 날짜와 윤달 여부를 확인해주세요.',FUTURE_BIRTH:'태어난 날짜는 한국 기준 오늘까지 입력할 수 있어요.',OUT_OF_RANGE:'태어난 날짜의 지원 범위는 1900년 1월 1일부터 한국 기준 오늘까지예요.',NONEXISTENT_LOCAL_TIME:'과거 한국의 시각 변경으로 존재하지 않는 출생 시각이에요. 기록된 시각을 확인하거나 시간 모름을 선택해주세요.',TABLE_INTEGRITY_FAILURE:'계산 자료를 정확히 읽지 못했어요. 새로고침해서 다시 준비해주세요.',UNSUPPORTED_TIME_RULE:'이 날짜의 시간 기준을 확인하지 못했어요. 계산 자료를 다시 준비해주세요.'};
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=value=>escape(String(value??'').replace(/\{displayName\}/g,'사용자').replace(/\{typeLabel\}/g,state.profile?.mbti||''));
  const storageKey='saju.browser.test.v1';
  const readingVersion='WEB_ROLE_COPY_2026_10_07_R6_58f527a5';
  const fresh=()=>({version:2,readingVersion,profile:null,result:null,target:'',tab:'today',expanded:{},scroll:{},cache:{}});
  let state=fresh(),ready=false,pending=null,sequence=0,daySequence=0,dayRequest=null;
  try{const saved=JSON.parse(sessionStorage.getItem(storageKey)||'null');if(saved?.version===1||saved?.version===2){
    state={...fresh(),...saved};
    if(saved.readingVersion!==readingVersion)state={...fresh(),profile:saved.profile,target:saved.target||'',tab:saved.tab||'today',expanded:saved.expanded||{},scroll:saved.scroll||{}};
  }}catch{}
  function save(){try{if(!state.profile&&!state.result)sessionStorage.removeItem(storageKey);else sessionStorage.setItem(storageKey,JSON.stringify(state));}catch{ /* Current page still works when private-mode storage is disabled. */ }}
  const koreaToday=()=>new Date(Date.now()+9*3600000).toISOString().slice(0,10);
  const cacheKey=(p,date)=>JSON.stringify([p.year,p.month,p.day,p.calendar,p.leap,p.time,p.mbti,p.romanceHidden,date]);
  function rememberView(){if($('#result-screen').hidden)return;state.scroll[state.tab]=window.scrollY;save();}
  function options(select,values,label,suffix='',wanted=''){
    select.innerHTML=`<option value="">${label}</option>`+values.map(v=>`<option value="${v}">${v}${suffix}</option>`).join('');
    select.value=values.map(String).includes(String(wanted))?String(wanted):'';
  }
  function birthYears(){
    const year=Number(koreaToday().slice(0,4)),min=$('#birth-calendar').value==='KOREAN_LUNAR'?1899:1900;
    options($('#birth-year'),Array.from({length:year-min+1},(_,i)=>year-i),'연도 선택','년',$('#birth-year').value);
  }
  function typeButtons(selected){return [...types,''].map(type=>`<button type="button" class="type-button ${type?'':'type-unknown'}" data-type="${type}" aria-pressed="${type===selected}">${type||'아직 몰라요 · 기본 사주만 보기'}</button>`).join('');}
  function formTypes(){
    $('#mbti-buttons').innerHTML=typeButtons($('#mbti').value);
    $$('#mbti-buttons [data-type]').forEach(button=>button.addEventListener('click',()=>{$('#mbti').value=button.dataset.type;formTypes();}));
  }
  function birthDays(wanted=$('#birth-day').value){
    const year=Number($('#birth-year').value),month=Number($('#birth-month').value);
    $('#birth-day').disabled=true;
    if(!year||!month){dayRequest=null;options($('#birth-day'),[],'일 선택');$('#birth-day-hint').textContent='연도와 월을 먼저 골라주세요.';$('#submit-profile').disabled=!ready||pending!==null;return;}
    if(!ready){$('#birth-day-hint').textContent='자료 준비가 끝나면 실제 날짜 수에 맞춰 일을 고를 수 있어요.';return;}
    dayRequest={id:++daySequence,wanted};$('#birth-day-hint').textContent='이 달의 날짜를 확인하고 있어요…';$('#submit-profile').disabled=true;
    worker.postMessage({kind:'month-days',id:dayRequest.id,year,month,lunar:$('#birth-calendar').value==='KOREAN_LUNAR',leap:$('#birth-leap').checked});
  }
  function syncForm(wanted=$('#birth-day').value){
    birthYears();
    const lunar=$('#birth-calendar').value==='KOREAN_LUNAR';
    $('#leap-label').hidden=!lunar;if(!lunar)$('#birth-leap').checked=false;
    const unknown=$('#time-unknown').checked;
    $('#time-fields').hidden=unknown;$('#birth-hour').disabled=unknown;$('#birth-minute').disabled=unknown;
    formTypes();
    birthDays(wanted);
  }
  for(const id of ['birth-year','birth-month','time-unknown'])$('#'+id).addEventListener('change',()=>syncForm());
  for(const id of ['birth-calendar','birth-leap'])$('#'+id).addEventListener('change',()=>syncForm(''));
  options($('#birth-month'),Array.from({length:12},(_,i)=>i+1),'월 선택','월');
  options($('#birth-hour'),Array.from({length:24},(_,i)=>String(i).padStart(2,'0')),'시 선택','시');
  options($('#birth-minute'),Array.from({length:60},(_,i)=>String(i).padStart(2,'0')),'분 선택','분');formTypes();
  function fillForm(profile){if(!profile)return;$('#birth-calendar').value=profile.calendar;birthYears();$('#birth-year').value=profile.year;$('#birth-month').value=profile.month;$('#birth-leap').checked=profile.leap;$('#time-unknown').checked=!profile.time;const parts=(profile.time||':').split(':');$('#birth-hour').value=parts[0];$('#birth-minute').value=parts[1];$('#mbti').value=profile.mbti;formTypes();$('#romance-hidden').checked=profile.romanceHidden;syncForm(profile.day);}
  function error(message){$('#form-error').textContent=message;$('#form-error').hidden=false;$('#form-error').scrollIntoView({block:'center',behavior:'smooth'});}
  const worker=new Worker('worker.js?build=reading-r2');
  worker.onmessage=({data})=>{
    if(data.kind==='progress')$('#load-state').textContent=data.message;
    else if(data.kind==='ready'){
      ready=true;$('#load-state').textContent='준비됐어요. 날짜와 MBTI를 넣고 결과를 열어보세요.';$('#load-state').classList.add('ready');$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';
      birthDays(state.profile?.day||$('#birth-day').value);
      if(state.profile&&!state.result&&!pending)calculate(state.profile,state.target||koreaToday(),state.tab,false);
    }else if(data.kind==='month-days'&&data.id===dayRequest?.id){
      const wanted=dayRequest.wanted;dayRequest=null;
      options($('#birth-day'),Array.from({length:data.days},(_,i)=>i+1),'일 선택','일',wanted?Math.min(Number(wanted),data.days):'');
      $('#birth-day').disabled=data.days===0;
      $('#submit-profile').disabled=!ready||pending!==null;
      $('#birth-day-hint').textContent=data.days?`이 달은 ${data.days}일까지 있어요.`:($('#birth-leap').checked?'이 연도·월에는 해당 윤달이 없어요. 날짜나 윤달 여부를 바꿔주세요.':'이 달의 날짜 자료를 확인할 수 없어요. 연도와 월을 확인해주세요.');
    }else if(data.kind==='init-error'){
      $('#load-state').textContent=data.code==='BROWSER_GZIP_UNSUPPORTED'?'이 브라우저는 자료 압축 풀기를 지원하지 않아요. 최신 Chrome·Safari·Edge에서 열어주세요.':'계산 자료 준비에 실패했어요. 인터넷 연결을 확인한 뒤 새로고침해주세요.';
      $('#submit-profile').textContent='새로고침 후 다시 시도';
    }else if(data.kind==='result'&&pending?.id===data.id){
      const request=pending;pending=null;$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';
      if(data.result.quality==='UNSUPPORTED'){
        if($('#input-screen').hidden)showInput();
        error(warnings[data.result.warnings[0]]||'입력한 날짜·시간으로 계산할 수 없어요. 입력을 확인해주세요.');return;
      }
      state.profile=request.profile;state.target=request.target;state.result=data.result;
      if(request.reset){state.expanded={};state.scroll={};}
      state.cache[cacheKey(request.profile,request.target)]=data.result;
      const keys=Object.keys(state.cache);if(keys.length>48)for(const k of keys.slice(0,keys.length-48))delete state.cache[k];
      save();showResult(request.tab||'today',request.reset);return;
    }else if(data.kind==='calculation-error'&&pending?.id===data.id){
      pending=null;$('#submit-profile').disabled=false;$('#submit-profile').textContent='내 결과 보기';showInput();error('결과를 읽지 못했어요. 입력을 확인하고 다시 시도해주세요.');
    }
  };
  worker.onerror=()=>{$('#load-state').textContent='계산 프로그램을 시작하지 못했어요. 최신 브라우저에서 새로고침해주세요.';};
  worker.postMessage({kind:'init'});
  function calculate(profile,target,tab='today',reset=false){
    $('#form-error').hidden=true;
    const cached=state.cache[cacheKey(profile,target)];
    if(cached){state.profile=profile;state.target=target;state.result=cached;if(reset){state.expanded={};state.scroll={};}save();showResult(tab,reset);return;}
    if(!ready){showInput();error('계산 자료 준비가 끝나면 결과를 볼 수 있어요. 잠시 기다려주세요.');return;}
    pending={id:++sequence,profile,target,tab,reset};$('#submit-profile').disabled=true;$('#submit-profile').textContent='실제 앱 엔진으로 계산 중…';
    worker.postMessage({kind:'calculate',...pending,today:koreaToday()});
  }
  $('#profile-form').addEventListener('submit',event=>{
    event.preventDefault();const year=Number($('#birth-year').value),month=Number($('#birth-month').value),day=Number($('#birth-day').value);
    if(dayRequest){error('이 달의 날짜 목록을 준비하고 있어요. 잠시 후 다시 열어주세요.');return;}
    if(![year,month,day].every(Number.isInteger)||year<($('#birth-calendar').value==='KOREAN_LUNAR'?1899:1900)||year>Number(koreaToday().slice(0,4))||month<1||month>12||day<1||day>31){error($('#birth-leap').checked&&$('#birth-day').disabled&&!dayRequest?'이 연도·월에는 해당 윤달이 없어요. 날짜나 윤달 여부를 바꿔주세요.':'년·월·일을 모두 선택해주세요. 실제로 있는 날짜만 고를 수 있어요.');return;}
    const time=$('#time-unknown').checked?'':$('#birth-hour').value+':'+$('#birth-minute').value;
    if(!$('#time-unknown').checked&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)){error('태어난 시·분을 모두 고르거나 시간 모름을 선택해주세요.');return;}
    const profile={year,month,day,calendar:$('#birth-calendar').value,leap:$('#birth-leap').checked,time,mbti:$('#mbti').value,romanceHidden:$('#romance-hidden').checked};
    calculate(profile,state.target||koreaToday(),'today',true);
  });
  function showInput(){rememberView();fillForm(state.profile);$('#input-screen').hidden=false;$('#result-screen').hidden=true;$('#cancel-edit').hidden=!state.result;window.scrollTo(0,0);}
  $('#cancel-edit').addEventListener('click',()=>showResult(state.tab,false));
  function statusNotice(r){
    if(r.quality!=='NO_HOUR'&&r.quality!=='BOUNDARY_PARTIAL')return '';
    const flags=new Set(r.warnings),messages=[];
    const names={YEAR:'연주',MONTH:'월주',DAY:'일주',HOUR:'시주'};
    if(flags.has('UNKNOWN_BIRTH_TIME'))messages.push('태어난 시간을 모름으로 선택해 시주는 표시하지 않았어요.');
    const omitted=Object.keys(names).filter(key=>r.pillars[key]===null&&!(key==='HOUR'&&flags.has('UNKNOWN_BIRTH_TIME'))).map(key=>names[key]);
    if(flags.has('SOLAR_TERM_MINUTE_BOUNDARY'))messages.push(flags.has('UNKNOWN_BIRTH_TIME')?'출생일에 절기가 바뀌어, 정확한 출생 시각 없이 월주를 하나로 정할 수 없어요.':'출생 시각이 공식 자료에 적힌 절기 시각의 분 단위 확인 범위에 있어요. 초 단위 경계는 확정하지 않았어요.');
    else if(flags.has('SOLAR_TERM_PRECISION')||flags.has('UNVERIFIED_SOLAR_TERMS')||flags.has('SOURCE_WINDOW_OVERLAP')||flags.has('SOLAR_SOURCE_CONFLICT'))messages.push(flags.has('UNKNOWN_BIRTH_TIME')?'해당 연도의 절기 시각 자료도 충분히 정밀하지 않아 일부 사주 글자를 보류했어요.':'출생 시간은 확인했지만, 해당 연도의 절기 시각 자료가 충분히 정밀하지 않아 일부 사주 글자를 보류했어요. 시간을 다시 입력할 필요는 없어요.');
    else if(flags.has('EARLY_SOLAR_MODEL_LIMITED'))messages.push('이 시기의 절기 계산에는 자료의 한계가 있어요. 확인할 수 있는 글자로만 풀이해요.');
    if(flags.has('AMBIGUOUS_LOCAL_TIME'))messages.push('과거 한국의 시각 변경으로 기록된 시각을 두 가지로 해석할 수 있어요. 두 경우가 다른 사주 글자만 보류했어요.');
    if(omitted.length)messages.push(omitted.join('·')+'는 확인 전까지 비워두었어요.');
    if(r.pillars.DAY===null)messages.push('일간이 확정되지 않아 별점과 관련 맞춤 조언은 보류해요.');
    return messages.length?`<div class="notice" data-calculation-notice>${messages.map(message=>`<p>${escape(message)}</p>`).join('')}</div>`:'';
  }
  function details(key,label,body){return `<details data-detail="${escape(key)}" ${state.expanded[key]?'open':''}><summary>${escape(label)}</summary><div class="expanded">${body}</div></details>`;}
  function manuscript(value,missing='현재 조건에 맞는 원고는 보류 중이에요.'){
    if(!value?.texts)return `<p class="subtitle">${escape(value?.missingReason==='TYPE_NOT_SELECTED'?'MBTI를 입력하면 맞춤 조언을 볼 수 있어요.':missing)}</p>`;
    const t=value.texts;return `${t.title?`<p class="card-title">${text(t.title)}</p>`:''}<p class="card-body">${text(t.body||t.line||'')}</p>`;
  }
  function copy(value){return value?.reading||null;}
  function readingDetail(value){
    const c=copy(value);if(!c)return manuscript(value);
    const parts=c.detailParts||[];
    return parts.length?parts.map(part=>`${part.label?`<h4 class="reading-label">${text(part.label)}</h4>`:''}<p class="card-body">${text(part.text)}</p>`).join(''):`<p class="card-body">${text(c.detail)}</p>`;
  }
  function readingSummary(value){const c=copy(value);return c?`<p class="card-body reading-summary">${text(c.summary)}</p>`:manuscript(value);}
  function dailyCards(r){return `<div class="cards">${r.domains.map(domain=>{
    const t=domain.base?.texts;const c=copy(domain.base);const key='today-'+domain.id;
    const body=domain.mbti?.texts?`<span class="label-pill">${escape(r.type)} 행동 조언</span>${readingSummary(domain.mbti)}${details('today-mbti-more-'+domain.id,'이 조언을 실천하는 방법',readingDetail(domain.mbti))}`:manuscript(domain.mbti);
    const mbtiKey='today-mbti-'+domain.id;
    return `<article class="card" data-domain="${escape(domain.id)}"><div class="card-top"><span class="domain">${domains[domain.id]}</span><span class="stars" aria-label="${domain.grade===null?'별점 보류':`5점 중 ${domain.grade}점`}">${domain.grade===null?'별점 보류':'★'.repeat(domain.grade)+'☆'.repeat(5-domain.grade)}</span></div>${t?`<h3 class="card-title">${text(c?.title||t.title)}</h3>${readingSummary(domain.base)}`:'<p class="subtitle">이 조건의 풀이를 보류했어요.</p>'}${t?details(key,'오늘 운세 자세히 읽기',readingDetail(domain.base)):''}${details(mbtiKey,r.type?`${r.type}라면 이렇게 해봐요`:'MBTI 맞춤 조언',body)}</article>`;
  }).join('')}</div>`;}
  function natalCards(values,names,prefix){return `<div class="cards">${Object.entries(values).filter(([key])=>!state.profile.romanceHidden||key!=='ROMANCE').map(([key,value])=>{
    const t=value.texts,c=copy(value);return `<article class="card" data-section="${escape(key)}"><div class="card-top"><span class="domain">${escape(names[key]||key)}</span></div>${t?`<h3 class="card-title">${text(c?.title||t.title)}</h3>${readingSummary(value)}`:'<p class="subtitle">이 조건의 원고를 보류했어요.</p>'}${t?details(prefix+'-'+key,'같은 자리에서 자세히 보기',readingDetail(value)):''}</article>`;
  }).join('')}</div>`;}
  function guide(message,mood='neutral'){return `<div class="guide small"><p>${message}</p><img src="images/guide_b_${mood}.webp" width="208" height="260" alt="사주MBTI 안내 캐릭터"></div>`;}
  function dayStemCard(value){const c=copy(value);return `<article class="card" data-section="DAY_STEM">${c?`<h3 class="card-title">${text(c.title)}</h3>${readingSummary(value)}${details('natal-day-stem','일간 설명 자세히 읽기',readingDetail(value))}`:manuscript(value)}</article>`;}
  function typeTraitCards(type){return `<div class="cards" data-type-traits>${(typeProfiles[type]||[]).map((row,i)=>`<article class="card" data-type-trait="${i}" data-source-id="${escape(row.sourceId)}"><h3 class="card-title">${escape(row.title)}</h3><p class="card-body">${escape(row.description)}</p></article>`).join('')}</div>`;}
  function typeBasis(){return details('mbti-trait-basis','이 성향 설명의 기준','<p class="card-body">상황별 반응을 설명한 편집 초안이에요. 유형이 행동을 결정한다는 뜻은 아니며, 개인을 관찰한 사실이나 임상 진단이 아니에요.</p><p class="hint">유형별 상황 설명 원고 W010 · DRAFT. 아래 행동 조언을 거꾸로 성격 설명으로 바꾼 문장이 아니에요.</p>');}
  function natalTraits(r){const supported=!['PARTIAL','MIXED'].includes(r.signature);return natalCards(supported?r.natalBase:Object.fromEntries(Object.entries(r.natalBase).filter(([key])=>key==='STRUCTURE')),sections,'natal');}
  function natalBasis(r){
    const limited=['PARTIAL','MIXED'].includes(r.signature);
    const notice=limited?'<p class="hint" data-trait-limit>현재 구성에는 단일 십성을 대표로 한 성향 설명을 붙이지 않았어요. 확인된 사주 글자와 관계는 위에서 볼 수 있어요.</p>':'';
    return notice+details('natal-trait-basis','이 성향 설명의 기준','<p class="card-body">십성의 전통 성향 개념을 생활 말로 옮긴 편집 초안이에요. 편안함과 부담을 느끼는 생활 장면은 새로 풀어 쓴 해석이며, 개인 성격을 검사한 결과가 아니에요.</p><p class="hint">전정훈 「명리심리상담사 강의교안」 62–67쪽의 성향 개념을 참고했어요. 직업·건강·재산의 결과를 판정하는 설명은 아니에요. DRAFT · 사람 의미 승인·출시 승인 전.</p>');
  }
  function render(){
    const r=state.result;if(!r)return;let html='';
    if(state.tab==='today'){
      const [y,m,d]=r.date.split('-');html=`<h1>오늘의 운세</h1><p class="page-date">${Number(y)}년 ${Number(m)}월 ${Number(d)}일 · 한국 날짜</p>${guide('오늘의 분야별 흐름을 읽고,<br>행동 조언은 따로 펼쳐볼 수 있어요.','encourage')}${statusNotice(r)}${dailyCards(r)}`;
    }else if(state.tab==='natal'){
      html=`<h1>내 사주</h1><p class="subtitle">양력 기준 ${escape(r.birthSolarDate)} · ${state.profile.time?escape(state.profile.time):'시간 모름'}</p>${guide('사주 글자와 기본 성향을<br>쉬운 설명으로 함께 볼게요.','thinking')}${statusNotice(r)}<div class="pillars">${Object.entries(r.pillars).map(([key,p])=>`<div class="pillar"><span>${{YEAR:'연주',MONTH:'월주',DAY:'일주',HOUR:'시주'}[key]}</span><strong>${p?escape(p.korean):'—'}</strong></div>`).join('')}</div><p class="hint">연주·월주·일주·시주는 출생의 해·달·날·시각에 해당하는 사주 글자예요.</p>${dayStemCard(r.dayStemIntro)}${natalTraits(r)}${natalBasis(r)}`;
    }else if(state.tab==='mbti'){
      html=`<h1>${r.type?escape(r.type)+' 성향':'MBTI 성향'}</h1><p class="subtitle">생각하고 선택하고 대화할 때 나타날 수 있는 반응을 읽어요.</p>${guide('유형별로 마음이 가는 기준과<br>놓치기 쉬운 부분을 함께 볼게요.','listen')}<div id="quick-mbti" class="type-grid" role="group" aria-label="비교할 MBTI">${typeButtons(r.type)}</div>${r.type?typeTraitCards(r.type)+typeBasis()+details('mbti-action-area','사주와 연결한 행동 조언',`<p class="hint">아래는 성향 설명과 구분한 행동 조언이에요. 사주 조건에 맞춰 해볼 말과 행동을 담았어요.</p>${natalCards(r.natalMbti,blocks,'mbti')}`): '<div class="notice">유형을 고르면 생각·선택·대화의 성향 설명을 볼 수 있어요. 질문지는 이 웹 테스트에 포함하지 않았어요.</div>'}`;
    }else{
      const p=state.profile;html=`<h1>설정</h1><div class="settings-card"><h2>입력한 프로필</h2><p>${p.year}년 ${p.month}월 ${p.day}일 · ${p.calendar==='SOLAR'?'양력':'한국 음력'}${p.leap?' 윤달':''}<br>${p.time?escape(p.time):'시간 모름'} · ${escape(p.mbti||'MBTI 미선택')}</p><button class="secondary" id="edit-profile">생일·시간·MBTI 변경</button><label class="check"><input id="setting-romance" type="checkbox" ${p.romanceHidden?'checked':''}>연애 항목 숨기기</label></div><div class="settings-card"><h2>날짜를 바꿔서 테스트</h2><p>한국 날짜 기준으로 계산해요. 생일은 그대로 두고 날짜별 결과를 비교할 수 있어요.</p><div class="date-selector"><label class="sr-only" for="target-date">운세 날짜</label><input id="target-date" type="date" min="1908-04-01" max="2050-12-31" value="${escape(state.target)}"><button id="change-date" class="secondary">날짜 적용</button></div><button class="secondary" id="today-date">한국 기준 오늘로</button><p id="date-error" class="error" hidden role="alert"></p></div><div class="settings-card"><h2>테스트와 저장</h2><p>광고·결제 기능은 제외했으며 모든 원고를 볼 수 있어요. 앱의 일반 계산과 초안 원고를 사용해요. 원고의 사람 승인·출시 승인을 뜻하지 않아요.</p><p>입력과 결과는 이 브라우저 탭의 임시 저장소에 있어요. Android의 암호화 저장소와는 다르며, 서버로 보내지 않아요. 자료를 준비한 뒤에는 같은 화면 안에서 계산할 때 인터넷을 사용하지 않아요.</p><p>원고 버전: ${escape(r.packVersion)}<br>계산 버전: ${escape(r.ruleVersion)}</p><button class="secondary" id="clear-data">이 탭의 입력과 결과 지우기</button></div>`;
    }
    $('#result-content').innerHTML=html;
    $$('.tabs button').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.tab===state.tab)));
    $$('details[data-detail]').forEach(detail=>detail.addEventListener('toggle',()=>{state.expanded[detail.dataset.detail]=detail.open;save();}));
    $('#edit-profile')?.addEventListener('click',showInput);
    $$('#quick-mbti [data-type]').forEach(button=>button.addEventListener('click',()=>{rememberView();calculate({...state.profile,mbti:button.dataset.type},state.target,'mbti');}));
    $('#setting-romance')?.addEventListener('change',event=>{rememberView();calculate({...state.profile,romanceHidden:event.target.checked},state.target,'settings');});
    const changeDate=date=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date<'1908-04-01'||date>'2050-12-31'){$('#date-error').textContent='운세 날짜는 1908년 4월 1일~2050년 12월 31일 범위에서 골라주세요.';$('#date-error').hidden=false;return;}
      rememberView();state.scroll.today=0;calculate(state.profile,date,'today');
    };
    $('#change-date')?.addEventListener('click',()=>changeDate($('#target-date').value));$('#today-date')?.addEventListener('click',()=>changeDate(koreaToday()));
    $('#clear-data')?.addEventListener('click',()=>{pending=null;state=fresh();try{sessionStorage.removeItem(storageKey);}catch{}$('#profile-form').reset();syncForm();$('#cancel-edit').hidden=true;$('#form-error').hidden=true;history.replaceState(null,'','#input');showInput();});
  }
  function showResult(tab='today',reset=false){
    state.tab=['today','natal','mbti','settings'].includes(tab)?tab:'today';$('#input-screen').hidden=true;$('#result-screen').hidden=false;render();save();
    const hash='#'+state.tab;if(location.hash!==hash)history.pushState({tab:state.tab},'',hash);
    requestAnimationFrame(()=>window.scrollTo(0,reset?0:(state.scroll[state.tab]||0)));
  }
  $$('.tabs button').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.tab===state.tab)return;rememberView();showResult(button.dataset.tab);}));
  window.addEventListener('popstate',()=>{rememberView();if(location.hash==='#input')showInput();else if(state.result)showResult(location.hash.slice(1)||'today');});
  window.addEventListener('pagehide',rememberView);
  let scrollTimer;window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(rememberView,150);},{passive:true});
  if(state.profile&&state.result){fillForm(state.profile);showResult(location.hash.slice(1)||state.tab);}else{syncForm();history.replaceState(null,'','#input');}
  // Read-only observation for parity tests; no inputs are transmitted or put in the URL.
  Object.defineProperty(window,'sajuTest',{value:{get result(){return state.result;},get ready(){return ready;},get tab(){return state.tab;}},writable:false});
})();
