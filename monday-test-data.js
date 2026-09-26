const rows = (start, text) => text.trim().split('\n').map((line, i) => {
  const [name, score] = line.split('|');
  return { rank: start + i, name, score: Number(score) };
});
const page = (number, start, text, options={}) => ({
  number,
  image: `page-${String(number).padStart(2,'0')}.png`,
  rows: rows(start, text),
  ...options
});
export const mondaySubmission = {
  id: 'VSMON-20260921-RAIDARQN',
  bounty: 'Alliance Duel / VS',
  day: 'Monday',
  date: '2026-09-21',
  submitter: 'RaidARQN',
  memberId: 'raidarqn',
  matchup: '#1616 [NvSP] vs #1603 [UNIi]',
  points: 10,
  pages: [
page(1,1,`rahuld|91506270
HMĐăng|85540340
MaieV|83533694
KillerReddy|82722998
Thúy Loan|64376398
TankyTanktank|63857813
Thích mỹ tâm|61743820`),
page(2,8,`Q mun Q|58356916
52 B L U E|57822749
Kính Hoa 鏡花|56834970
Sunnyharry|52599885
njnmlb3|48560852
BanGer|46582360
LizardMercer|37750118`),
page(3,15,`StankyFänger|35365559
EE2079|33710209
Hallett Knows Nuthin|32531716
Nabe www|29507096
ĐQTRUNG|29290132
COL Geo222|27735678
MondMond|27106818`),
page(4,22,`かい1634|26908668
Gachipxinh75|26738273
hero0009|26339196
Col Read Icculus|26260984
Quỳnh Hoa|25831930
Subrata Dinda F2P|25815666
꼭꼭씹어먹어SJ|25581056`),
page(5,29,`Ling ÖÖ|25053582
CHIẾN DỊCH|24093692
ユーカリの88|24076817
Bánh Đậu Đỏ|23921805
Danh Du 91|23574708
Thiên Kim cute|23101916
COLIBRÍÍ|22630405`),
page(6,36,`Gacchan dsg|22586866
HappyJann|22431617
Sy4114|22430450
ErdemD|22327301
Rubix003|22256700
LinschXx|21896868
Mittens|20860269`),
page(7,43,`Pátrick|20824504
GENERAL MITCH|20751685
Ánh Nõn Nà|20644261
Benzato888|20488232
D B Z|20355938
EABEE133|20042251
Toy Smith|19975634`),
page(8,50,`Thức 1986 QN 76|19561695
Yukaes|19443487
Tiênnn Tiênnnnnnnn|19164070
Fee2|19023184
SnoopyEgg|18443128
APEY REXY|18351060
BAXTIYOR|18118001`),
page(9,57,`ณห์ โบ|18076073
Lững Mặt Baby|18058596
OLdGuard|17979018
Doc BadBird|17733990
吉若|17659505
Hvyyyy|17278671
Mwgas|17015162`),
page(10,64,`Miss|16916528
Luiskuwalker|16750938
Quetzal Maya|16666831
無課金たぬき|16555265
T H O R|16382021
SurfnSnow|16198202
Bastethan|15963848`),
page(11,71,`Big Big XL|15818328
LeonIS|15795125
hieudx37|15442687
เห็ด|15435694
MeechNdDem|15318060
JoeTess18|15237661
KatatoniKJR|15221691`),
page(12,78,`Huyền Chi|15198168
Shopee|15179375
ənhimmmɞ|14587389
éng iu|14572324
Naughty Annaaa|13950752
NikkiH86|13938125
Cërbërus|13765081`),
page(13,85,`ikuxhi|13561956
SashLKA|13484518
5 Star|13438263
Anh vô danh|13415133
Zenseri|13281813
joeuakafishboy|13160376
CyosuoKun|13140730`),
page(14,92,`T Văn Sơn|13007406
MIR Darkwaltz|12992619
M T T|12984426
るみるəɞ|12559389
LUCKY79|12178727
Cheengchu|12154255
Aee531|12018070`),
page(15,99,`Hawaiihemd|11867761
DaLanh|11636480
Hà Anh 96|11593666
UniiBon|11554714
Poseidonss4|11546558
DrizzZt x Sash|11409699
chupa chups|11393758`),
page(16,105,`chupa chups|11393758
Nilalal|11240601
NHƯ iuNilala|11239655
SunnyIAAAGas|10869591
Arctic Beast|10846690
azril25|10845795
Pappajay|10738253`),
page(17,112,`Nam ngein|10690600
Melanieb|10658875
xxxKAFKASxxx|10442806
□□ノアZoro|10437800
Nattyvivi|10436079
Pip 1620|10373607
Haakaann|10350094`),
page(18,119,`Văn Cường 89|10323375
Danish Ultimate|10312159
Aggiesquirrelgirl08|10162476
David牛牛|10067958
Acbzcs|10054125
EFRITZ|9858524
RaidARQN|9813750`),
page(19,126,`Missunderstood863|9773121
extrageneity|9665898
Siluxx|9653254
akinomercy|9610227
BoomSab|9610211
Mätt|9575944
AiNk CaT AwEwE|9552412`),
page(20,133,`Lieutenant Samanta|9526535
Ray0216|9420174
RRoxyy|9293140
Nathanmarish|9236783
미스터MM|9211491
Dookykid|9179170
Hansiii4711|9159002`),
page(21,140,`Risbo59|9143693
ChichiWanga|9140367
SadCry|9106423
Yuutä|9016443
thái sa lem|8976734
Kennnzz12|8970681
Maomao vn|8904825`),
page(22,147,`White AngelL|8726158
Tini baby|8714920
Ajeet89|8704498
鳳梨morning佛|8672601
從從神經冰|8612015
Kaangk|8610593
Phantom As|8461740`),
page(23,154,`nhchangg|8421526
ExoAmby|8320113
LazyBum247|8318231
Stüart|8109600
Tiểu Viêm 31|8096434
ICG Babe Vaew|8088371
ไข่ทอง|8055529`),
page(24,161,`A Alone|8016415
I Bewl I|8001012
Người yêu ong|7942883
Xà Bì Chưởng|7930129
OysterToe|7828633
Nojkoy|7671785
HIsNationalTreasure|7656446`),
page(25,168,`PandaMochi|7449992
ĐạiKa BánhĐậu|7387647
ぱえChan|7368872
Helmsman2|7356429
Phantom Cá|7339321
しぶとい様|7333983
Moonxinhdep|7321252`),
page(26,175,`OkomeChan|7319315
MinHye Nè|7257551
ThiW6|7233600
Monie Monie|6717240
Milk|4844316
datdiriditdirt|3641427
0lucasxo|2852743`),
page(27,175,`OkomeChan|7319315
MinHye Nè|7257551
ThiW6|7233600
Monie Monie|6717240
Milk|4844316
datdiriditdirt|3641427
0lucasxo|2852743`,{duplicateOf:26}),
page(28,181,`0lucasxo|2852743
SharkBait151|2420625
Rin bae|1707220
TMA Bae|1406250
Ali ihsan42|952500
Jihye angel|700580
bebuada|373968`),
page(29,182,`SharkBait151|2420625
Rin bae|1707220
TMA Bae|1406250
Ali ihsan42|952500
Jihye angel|700580
bebuada|373968
Byakuya70|0`)
  ]
};
