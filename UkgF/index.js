// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

// 小惑星データ（頂点数:300個）
var itokawa_data = [-8.1374, 43.5332, 48.7737, 34.2116, 43.8496, 42.2780, 62.5936, 27.6945, 37.0054, -25.5737, 43.5227, 48.6314, 37.4963, 31.0689, 50.2553, -81.1989, 38.1921, 44.2393, 11.5344, 38.6034, 50.4715, -71.2761, 25.2744, 50.3924, -48.2983, 31.1691, 54.2730, -32.6600, 29.5979, 56.3240, -5.4854, 23.3131, 58.3592, 12.4202, 23.9088, 56.3451, 24.2095, 16.1951, 56.8038, -66.1353, 4.8434, 53.6297, -45.5777, 14.0228, 58.6123, -19.1729, 8.6185, 62.5034, 5.2337, 7.5113, 60.8478, 38.5825, 9.5675, 56.6878, 20.3448, -3.9512, 58.4436, -70.6381, -12.0604, 49.2904, -9.4661, -13.3996, 60.4471, 36.8267, -9.4399, 58.6914, -51.3142, -1.6840, 57.5314, -34.2576, -15.0552, 58.6176, -89.5348, -22.0729, 39.5099, -84.8528, -9.4083, 44.4344, 52.7920, -23.0167, 57.2361, -50.0647, -19.7372, 53.7563, -23.9761, -27.2927, 55.0480, 19.9283, -27.8200, 52.8441, -40.1628, -31.7217, 50.4346, 36.6158, -27.1029, 55.4751, 2.4867, -31.0046, 52.7229, -60.1036, -29.0432, 46.5803, -76.7753, -34.4423, 38.4712, 47.4772, -40.8115, 47.4925, -52.0893, -42.4513, 40.6277, -23.0165, -40.7377, 46.5962, -7.3940, -42.9364, 45.3782, 26.1973, -44.7027, 43.7437, -73.0792, -50.3759, 29.8717, 5.7346, -48.9259, 40.6646, -85.6701, -52.8803, 24.1457, -37.0151, -52.1791, 34.9228, -18.3029, -57.9209, 29.4288, -41.1751, -60.7259, 24.0824, -57.2880, -58.5220, 25.2424, 20.3395, -60.1565, 27.0878, 4.4006, -63.7629, 21.0086, 60.3528, -51.4462, 18.0032, 43.5229, -56.3708, 29.2812, -12.4187, -69.1197, 10.2368, -30.4297, -67.5116, 15.8151, 25.3484, -67.1162, 8.0909, -82.2271, -63.2567, 12.1033, -48.0083, -70.2270, 12.2825, -32.7391, -74.9565, 2.8447, -62.2969, -74.1867, -2.8708, 48.1047, -61.1160, 11.4073, -69.6731, -69.0407, 7.8114, 3.6309, -70.3799, 2.1329, 67.5287, -46.7220, 0.5248, -99.7425, -61.1846, -2.4648, 5.6028, -67.1109, -11.4123, -44.8290, -77.8089, -10.6688, -28.7794, -76.3484, -11.9975, -11.9231, -71.5188, -12.6935, -82.8598, -65.4396, -13.2049, 45.8428, -58.3163, -2.5597, -67.4851, -70.7015, -17.9396, -48.6041, -71.5715, -24.0822, 29.2606, -57.6414, -13.1311, -92.6984, -59.0650, -20.9081, 56.6831, -46.0946, -9.4561, -25.3734, -67.2691, -26.4021, 41.9622, -47.1227, -15.8517, -76.3324, -57.8101, -31.9593, -40.3474, -60.6362, -34.8856, -6.7824, -62.4658, -26.0383, 54.6269, -35.2859, -22.1629, -57.4779, -58.5642, -34.7959, 17.3711, -55.7644, -20.4968, 30.4839, -41.4232, -25.2790, -33.5616, -49.8275, -40.5536, 8.6029, -44.7607, -34.6747, -93.2256, 16.3375, 43.0425, -83.4240, 5.6922, 47.1920, -95.7248, 30.6683, 41.0494, -104.3401, 50.0343, 32.3972, -98.7406, -1.2148, 40.1004, -109.1909, 37.1693, 34.8595, -106.2540, -17.9867, 33.0299, -96.8847, -34.9115, 31.6116, -110.7304, 14.0756, 35.7136, -115.4335, -29.7708, 22.7801, -127.9505, 13.9701, 24.1984, -117.5900, -10.5630, 28.1159, -124.4496, 32.4504, 26.9402, -106.1750, 66.3422, 22.1474, -129.9647, 44.8988, 20.3284, -99.0307, -53.3602, 16.7695, -134.0192, -4.9214, 15.4724, -139.9086, 33.4733, 12.8994, -140.2724, 8.8769, 10.9433, -129.2687, -24.1978, 12.4354, -115.8659, -45.8942, 9.3088, -126.3635, 57.9694, 14.2228, -114.1629, 71.2404, 4.8641, -142.1651, -6.4240, -0.8303, -135.4059, -28.1733, -5.4807, -144.9122, 39.7001, -2.2328, -127.6236, -39.3932, -0.1027, -118.4019, -54.8998, -5.8181, -132.3425, 61.7762, -7.4315, -120.1525, 67.0856, -17.4493, -143.5520, 48.1203, -16.1733, -140.0721, 5.8346, -24.6147, -104.3560, 70.1068, -21.9995, -140.9686, -18.5298, -14.6654, -143.9844, 14.1177, -9.3191, -123.6957, -45.1666, -17.4915, -140.7100, 25.5908, -24.3036, -132.8171, 42.0569, -34.4005, -136.7135, -17.4120, -33.0613, -106.1274, -55.1633, -19.6532, -136.2494, -3.7667, -36.2881, -131.5254, -32.6707, -24.7412, -123.0997, 58.5547, -29.1016, -129.3794, 23.5503, -40.8594, -114.9116, -37.4002, -38.0913, -129.7959, 7.7116, -42.6995, -122.2457, -11.8442, -51.0723, -115.2647, 2.6922, -56.2762, -126.4742, -24.3348, -41.7135, -122.3089, 35.8195, -44.6292, -101.0501, 57.9536, -34.8645, -108.2734, -25.0941, -51.7156, -102.9270, -10.6052, -59.7983, -106.6969, 46.0377, -43.2320, -108.1890, 28.9968, -52.7384, -99.1256, 19.4852, -59.8458, -93.0358, 1.2264, -62.4662, 4.5430, 48.6423, 43.5276, -62.0966, 47.3927, 45.1990, -9.9881, 54.1678, 40.0266, -48.0769, 48.1836, 44.8299, -78.2833, 55.6179, 37.9387, -38.4440, 56.3824, 37.6329, -57.0297, 59.3877, 37.5485, 42.6160, 43.4436, 29.4763, 21.1304, 51.9007, 34.2215, -25.8268, 60.3421, 32.6292, -90.8477, 64.1067, 30.0193, -70.8332, 68.4407, 27.5570, 49.8288, 42.4681, 15.9680, -4.1989, 62.2402, 22.1264, -40.5002, 69.0102, 22.4321, -90.2783, 74.6939, 18.8679, 28.0691, 50.1766, 6.8307, 7.5800, 57.2840, 28.1159, -19.9743, 66.2104, 19.3530, -55.1052, 72.1525, 18.9997, 7.8436, 56.5564, 2.7340, -44.8395, 72.8802, 5.0011, 71.1721, 43.0587, 9.2561, -97.4542, 77.7678, -0.4454, -7.6840, 63.5689, 6.3931, -28.6950, 69.1577, -1.6264, -62.8189, 73.1965, 1.7005, -79.2534, 76.1280, 5.4862, 46.6284, 42.7529, 0.9202, -75.2094, 73.6130, -9.0818, -80.9986, 69.6955, -22.8537, -13.1727, 61.3069, -7.3788, -46.8378, 69.0945, -12.9360, 62.3880, 43.6967, -4.2522, -61.8435, 69.9328, -16.0257, -0.2919, 51.7478, -14.5336, -50.4706, 57.5002, -32.6395, 15.0248, 48.0992, -11.3964, -9.5188, 47.9991, -24.8361, 33.5947, 42.8056, -10.7637, -67.3902, 58.6548, -34.9330, -28.1836, 58.2172, -23.7342, 23.1498, 39.2941, -21.0926, -84.7684, 56.3402, -36.8786, 52.3596, 39.1992, -18.0978, 41.9569, 31.6753, -29.7449, -25.6475, 46.5228, -33.5622, -39.0240, 40.4962, -42.6151, 60.9960, -6.1973, 55.8337, 60.2790, -42.8414, 38.3657, 75.2582, -21.1186, 44.3342, 59.4828, 14.8612, 50.1130, 87.3850, 13.2847, 37.5643, 76.6977, 32.7930, 24.9788, 73.1176, -41.0540, 26.7029, 83.0985, -2.9020, 43.6541, 92.6418, -18.1554, 33.4834, 87.2163, -31.8482, 26.7187, 103.5718, -4.6419, 34.3534, 106.7932, -21.9095, 26.2969, 103.9409, 18.1091, 26.8927, 116.4684, -9.2712, 26.5553, 94.5399, 29.7403, 23.4603, 121.5353, 3.8416, 20.3970, 102.8811, 39.8583, 12.1560, 109.9727, -33.4194, 17.3020, 129.7816, 17.0704, 10.1155, 115.6037, 31.1955, 12.8467, 88.5503, 44.6246, 9.9415, 125.1574, -16.7424, 15.1613, 88.1496, -46.7010, 12.0294, 135.8291, -0.7983, 6.7727, 124.6882, -30.5195, 4.3315, 137.6165, -18.0394, -6.5299, 139.5620, 17.4131, -4.4367, 133.6990, 29.5874, -9.1082, 114.2856, 42.9954, -1.9691, 106.5297, -42.9627, 5.9555, 144.2440, 0.1561, -9.8410, 129.4336, -32.0170, -11.4861, 144.9875, 14.4446, -28.5427, 94.2499, 52.5914, -7.3313, 91.2076, -46.3793, -6.6670, 112.4665, -47.6975, -8.7760, 145.4250, -4.5734, -27.8942, 132.6973, 34.3538, -24.3300, 106.5928, 48.8848, -25.0154, 120.2172, 41.3504, -19.8430, 137.2211, 29.2288, -40.6379, 99.4803, -45.0243, -23.7447, 120.3385, -42.7782, -20.1963, 133.8571, -26.4913, -26.3019, 136.5250, -11.1061, -42.5149, 138.8977, 8.0385, -49.9176, 128.2578, 39.8952, -37.8962, 112.4612, 41.1500, -47.8191, 128.2155, -23.6810, -40.2108, 89.3623, 51.2733, -24.7307, 113.2099, -36.1506, -35.3759, 123.9132, 31.9600, -52.9335, 79.4341, 50.8304, -7.9904, 126.6022, -2.7913, -58.7491, 83.2092, -41.4073, -20.4494, 120.8868, -15.2872, -54.3096, 121.5300, 11.6238, -61.6542, 68.0454, 43.8127, -18.6462, 105.3592, -11.5226, -57.8000, 93.3905, 42.2362, -44.7557, 78.1265, -32.1962, -30.0876, 99.1639, -29.8288, -45.4465, 107.5473, 4.5059, -60.5839, 104.2255, 22.5591, -56.5768, 77.3725, 44.5772, -29.6025, 90.5644, -16.8637, -49.2058, 89.0089, -1.5575, -50.8456, 89.9950, 19.5010, -52.2269, 77.1510, 31.6964, -42.7996, 66.7853, 30.0092, -33.4989, 75.5904, -13.9901, -40.0790, 60.6375, -20.3066, -33.3460, 74.6045, 13.9174, -43.5536, -64.7487, -41.4389, -45.3199, -8.3167, -46.8433, -38.9929, -19.5578, -31.9273, -45.2830, -88.9496, -41.9715, -43.1266, -73.7278, -30.3244, -51.9633, -44.5812, -35.3913, -47.0282, -2.6329, -24.2558, -44.5765, 41.1819, -26.7549, -33.1562, 20.3870, -30.3825, -35.9032, -33.5141, -25.3103, -48.9527, -51.0190, -22.2838, -52.6382, -77.3500, -17.4858, -57.4625, -90.2361, -26.1644, -53.6559, 5.9982, -8.2589, -44.7821, 36.5737, -11.8706, -41.0123, -33.7778, -7.5682, -53.1022, 61.7500, 0.1508, -39.3567, -63.4833, -7.6789, -58.3800, 18.4783, 7.5482, -41.7082, -16.6262, -8.3907, -49.9017, -75.7102, 11.2126, -60.5048, -5.1690, 11.3708, -45.7945, -50.8661, -0.4661, -56.2340, 38.7512, 7.9383, -42.7311, 51.7638, 13.6432, -38.9560, -37.5529, 13.3849, -52.3218, -21.9462, 10.7222, -50.1812, -59.8874, 14.5923, -56.6823, 25.5646, 26.4449, -34.4691, -44.6128, 26.2604, -50.3816, -9.2025, 33.6894, -36.3144, 11.6557, 26.9985, -35.2757, -66.2144, 29.0285, -52.7542, -23.8865, 31.4433, -42.2460, -86.8194, 37.8705, -49.9123, 5.2443, 39.4470, -26.9821, -60.9893, 41.8460, -45.7681 ];
var itokawa_indices = [85, 7, 86, 24, 34, 92, 87, 7, 85, 87, 5, 7, 25, 19, 24, 86, 19, 25, 24, 19, 34, 7, 13, 86, 86, 13, 19, 34, 19, 33, 146, 143, 5, 5, 143, 7, 19, 27, 33, 33, 36, 34, 19, 13, 22, 19, 22, 27, 143, 8, 7, 14, 13, 7, 13, 14, 22, 143, 145, 8, 7, 8, 14, 33, 27, 30, 14, 23, 22, 22, 23, 27, 33, 30, 36, 27, 23, 30, 145, 3, 8, 3, 9, 8, 8, 9, 14, 23, 28, 30, 30, 37, 36, 36, 37, 43, 9, 15, 14, 14, 15, 23, 28, 37, 30, 23, 20, 28, 15, 20, 23, 3, 10, 9, 3, 0, 10, 9, 10, 15, 20, 32, 28, 28, 32, 37, 37, 32, 38, 10, 16, 15, 16, 20, 15, 0, 6, 10, 38, 32, 41, 18, 32, 20, 0, 142, 6, 6, 11, 10, 10, 11, 16, 16, 18, 20, 18, 29, 32, 32, 39, 41, 11, 12, 16, 12, 18, 16, 32, 29, 39, 6, 150, 1, 1, 4, 6, 6, 4, 11, 4, 12, 11, 18, 21, 29, 21, 31, 29, 12, 17, 18, 29, 31, 39, 17, 21, 18, 4, 17, 12, 21, 26, 31, 31, 35, 39, 4, 193, 17, 31, 26, 35, 17, 193, 190, 17, 190, 21, 1, 149, 4, 21, 190, 26, 149, 2, 4, 2, 193, 4, 35, 26, 191, 92, 42, 100, 54, 67, 62, 42, 54, 100, 62, 67, 72, 92, 34, 42, 72, 76, 266, 34, 40, 42, 54, 59, 67, 72, 67, 76, 76, 263, 266, 42, 40, 54, 40, 46, 54, 59, 57, 67, 67, 57, 69, 67, 69, 76, 46, 59, 54, 34, 36, 40, 69, 80, 76, 76, 80, 263, 36, 46, 40, 46, 55, 59, 59, 55, 57, 69, 57, 70, 69, 70, 80, 57, 64, 70, 36, 43, 46, 55, 64, 57, 43, 45, 46, 45, 55, 46, 80, 70, 77, 80, 268, 263, 77, 83, 80, 80, 83, 268, 45, 52, 55, 55, 56, 64, 52, 56, 55, 56, 65, 64, 64, 65, 74, 64, 74, 70, 70, 74, 77, 43, 44, 45, 45, 44, 52, 77, 74, 83, 52, 51, 56, 43, 37, 44, 56, 66, 65, 65, 66, 74, 74, 264, 83, 56, 51, 66, 74, 78, 264, 74, 66, 78, 37, 38, 44, 44, 51, 52, 51, 60, 66, 44, 48, 51, 38, 41, 44, 41, 48, 44, 66, 60, 63, 66, 63, 78, 51, 48, 60, 78, 84, 264, 60, 53, 63, 41, 47, 48, 48, 53, 60, 78, 63, 81, 78, 81, 84, 39, 47, 41, 47, 53, 48, 53, 71, 63, 63, 71, 81, 81, 82, 84, 47, 50, 53, 53, 68, 71, 84, 82, 271, 81, 71, 82, 47, 39, 50, 50, 58, 53, 58, 68, 53, 71, 75, 82, 71, 68, 75, 39, 35, 50, 50, 49, 58, 35, 191, 50, 58, 49, 68, 68, 73, 75, 49, 61, 68, 68, 61, 73, 75, 79, 82, 50, 191, 49, 75, 73, 79, 157, 98, 107, 152, 88, 98, 5, 87, 88, 165, 107, 117, 107, 114, 117, 114, 127, 117, 117, 127, 135, 98, 88, 106, 98, 106, 107, 88, 87, 90, 107, 113, 114, 127, 138, 135, 107, 106, 113, 113, 127, 114, 127, 122, 138, 138, 139, 297, 88, 99, 106, 122, 134, 138, 113, 115, 127, 90, 97, 88, 88, 97, 99, 139, 140, 297, 115, 122, 127, 106, 99, 110, 106, 110, 113, 134, 139, 138, 87, 93, 90, 113, 110, 115, 90, 93, 97, 97, 102, 99, 99, 102, 110, 122, 128, 134, 87, 85, 93, 121, 128, 122, 97, 95, 102, 115, 121, 122, 134, 128, 139, 93, 95, 97, 110, 119, 115, 115, 119, 121, 121, 116, 128, 95, 103, 102, 119, 116, 121, 139, 132, 140, 132, 141, 140, 85, 89, 93, 102, 103, 119, 102, 119, 110, 116, 130, 128, 130, 132, 128, 128, 132, 139, 86, 89, 85, 95, 101, 103, 93, 96, 95, 103, 108, 119, 108, 116, 119, 116, 125, 130, 89, 96, 93, 95, 96, 101, 103, 101, 108, 125, 131, 130, 131, 132, 130, 86, 25, 89, 108, 118, 116, 116, 123, 125, 132, 137, 141, 116, 118, 123, 125, 123, 131, 132, 131, 137, 89, 91, 96, 108, 109, 118, 101, 104, 108, 123, 133, 131, 104, 109, 108, 137, 275, 141, 101, 96, 104, 131, 136, 137, 123, 118, 126, 137, 136, 275, 25, 24, 89, 89, 24, 91, 131, 133, 136, 104, 111, 109, 118, 109, 126, 123, 126, 133, 91, 94, 96, 109, 111, 120, 96, 94, 104, 109, 120, 126, 133, 129, 136, 94, 105, 104, 104, 105, 111, 24, 92, 91, 91, 92, 94, 133, 126, 129, 111, 112, 120, 136, 266, 275, 111, 105, 112, 120, 129, 126, 92, 105, 94, 136, 129, 266, 120, 124, 129, 92, 100, 105, 100, 62, 105, 105, 62, 112, 112, 124, 120, 129, 124, 266, 112, 62, 124, 124, 62, 72, 124, 72, 266, 54, 62, 100, 2, 154, 195, 164, 242, 210, 2, 149, 154, 242, 175, 247, 195, 154, 164, 247, 175, 186, 164, 175, 242, 164, 154, 170, 175, 170, 186, 170, 181, 186, 164, 170, 175, 186, 181, 187, 149, 1, 150, 149, 158, 154, 181, 184, 187, 154, 158, 170, 149, 150, 158, 158, 181, 170, 181, 179, 184, 158, 179, 181, 150, 159, 158, 184, 179, 298, 6, 142, 150, 158, 159, 162, 158, 162, 179, 150, 142, 159, 179, 177, 298, 159, 155, 162, 162, 177, 179, 142, 144, 159, 144, 155, 159, 162, 155, 166, 177, 180, 298, 180, 293, 298, 142, 0, 144, 162, 173, 177, 166, 173, 162, 173, 180, 177, 155, 144, 151, 155, 151, 160, 155, 160, 166, 180, 188, 293, 0, 3, 144, 173, 183, 180, 3, 151, 144, 166, 167, 173, 183, 188, 180, 166, 160, 167, 167, 183, 173, 160, 156, 167, 3, 147, 151, 151, 156, 160, 156, 163, 167, 183, 178, 188, 188, 189, 296, 151, 147, 156, 167, 174, 183, 178, 189, 188, 3, 145, 147, 163, 174, 167, 174, 178, 183, 147, 145, 156, 156, 161, 163, 145, 148, 156, 178, 299, 189, 145, 143, 148, 163, 168, 174, 174, 176, 178, 148, 153, 156, 156, 153, 161, 161, 168, 163, 168, 176, 174, 176, 182, 178, 161, 153, 168, 178, 182, 299, 148, 143, 153, 168, 171, 176, 171, 172, 176, 176, 172, 182, 153, 169, 168, 143, 146, 153, 168, 169, 171, 153, 157, 169, 172, 185, 182, 171, 165, 172, 182, 185, 299, 146, 152, 153, 153, 152, 157, 169, 165, 171, 185, 297, 299, 157, 165, 169, 165, 117, 172, 172, 117, 185, 117, 135, 185, 5, 88, 146, 146, 88, 152, 135, 138, 185, 152, 98, 157, 157, 107, 165, 185, 138, 297, 49, 196, 61, 196, 212, 61, 191, 196, 49, 61, 250, 73, 73, 250, 79, 212, 224, 61, 224, 244, 61, 61, 244, 250, 250, 261, 79, 191, 192, 196, 196, 199, 212, 191, 26, 192, 192, 199, 196, 225, 231, 224, 224, 231, 244, 231, 250, 244, 199, 207, 212, 212, 219, 224, 224, 219, 225, 212, 207, 219, 231, 251, 250, 225, 232, 231, 199, 192, 198, 199, 198, 201, 199, 201, 207, 232, 240, 231, 231, 240, 251, 26, 190, 192, 219, 207, 214, 219, 214, 221, 219, 221, 225, 225, 221, 232, 250, 260, 261, 251, 255, 250, 198, 200, 201, 201, 211, 207, 221, 233, 232, 232, 233, 240, 250, 255, 260, 192, 197, 198, 201, 200, 203, 201, 203, 211, 207, 211, 214, 233, 238, 240, 238, 245, 240, 240, 245, 251, 261, 260, 279, 197, 200, 198, 214, 215, 221, 215, 233, 221, 190, 197, 192, 211, 215, 214, 245, 248, 251, 233, 234, 238, 248, 255, 251, 203, 205, 211, 211, 205, 213, 211, 213, 215, 213, 220, 215, 215, 226, 233, 234, 245, 238, 255, 256, 260, 220, 226, 215, 226, 234, 233, 245, 243, 248, 248, 256, 255, 260, 256, 279, 200, 205, 203, 234, 243, 245, 205, 208, 213, 197, 194, 200, 226, 235, 234, 243, 252, 248, 248, 252, 256, 213, 216, 220, 216, 222, 220, 220, 222, 226, 234, 235, 243, 190, 193, 197, 193, 194, 197, 226, 222, 235, 200, 202, 205, 213, 208, 216, 235, 246, 243, 243, 246, 252, 252, 253, 256, 256, 262, 279, 194, 202, 200, 246, 253, 252, 253, 257, 256, 257, 262, 256, 216, 217, 222, 222, 230, 235, 205, 209, 208, 230, 241, 235, 235, 241, 246, 246, 241, 253, 208, 217, 216, 202, 209, 205, 222, 227, 230, 217, 227, 222, 241, 237, 253, 193, 2, 194, 194, 204, 202, 227, 236, 230, 230, 236, 241, 237, 249, 253, 249, 257, 253, 257, 258, 262, 208, 209, 217, 262, 287, 279, 227, 229, 236, 258, 259, 262, 202, 204, 209, 209, 218, 217, 217, 218, 229, 217, 229, 227, 236, 229, 237, 236, 237, 241, 257, 249, 258, 262, 259, 287, 2, 195, 194, 195, 204, 194, 229, 228, 237, 204, 206, 209, 259, 187, 287, 209, 206, 218, 237, 228, 249, 218, 228, 229, 204, 210, 206, 249, 254, 258, 195, 210, 204, 228, 239, 249, 206, 223, 218, 218, 223, 228, 239, 254, 249, 258, 254, 259, 228, 223, 239, 239, 223, 242, 239, 242, 254, 206, 210, 223, 242, 247, 254, 254, 247, 259, 195, 164, 210, 259, 186, 187, 210, 242, 223, 247, 186, 259, 141, 283, 140, 140, 283, 297, 275, 274, 141, 274, 283, 141, 266, 267, 275, 267, 274, 275, 283, 295, 297, 266, 263, 267, 295, 299, 297, 274, 280, 283, 267, 273, 274, 273, 280, 274, 280, 285, 283, 283, 290, 295, 267, 263, 273, 285, 290, 283, 290, 292, 295, 263, 268, 273, 273, 285, 280, 295, 292, 299, 285, 288, 290, 288, 292, 290, 292, 189, 299, 273, 278, 285, 268, 272, 273, 285, 278, 288, 273, 272, 278, 278, 289, 288, 288, 296, 292, 292, 296, 189, 83, 265, 268, 268, 265, 272, 272, 282, 278, 278, 282, 289, 288, 289, 296, 264, 265, 83, 272, 265, 282, 289, 282, 284, 282, 276, 284, 296, 293, 188, 289, 284, 296, 296, 284, 293, 265, 264, 269, 265, 269, 282, 269, 276, 282, 84, 269, 264, 276, 281, 284, 284, 294, 293, 293, 294, 298, 84, 271, 269, 271, 276, 269, 284, 281, 294, 298, 294, 184, 276, 277, 281, 277, 286, 281, 271, 277, 276, 281, 286, 291, 281, 291, 294, 294, 291, 184, 291, 187, 184, 82, 270, 271, 286, 187, 291, 270, 277, 271, 277, 279, 286, 286, 279, 287, 286, 287, 187, 79, 270, 82, 270, 261, 277, 261, 279, 277, 270, 79, 261 ];

var GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");
GLExtRequestor.request("OES_standard_derivatives");

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  // 3次元リサージュの座標データを用意
  //             1.0 y 
  //              ^  -1.0 
  //              | / z
  //              |/       x
  // -1.0 -----------------> +1.0
  //            / |
  //      +1.0 /  |
  //           -1.0
  // 
  var MAX = 300;
  var positions = new Float32Array(MAX * 3);
  var colors = new Float32Array(MAX * 4);

  var k = 0;
  for ( var i = 0; i <= MAX; i += 0.1 ) {
    var x = itokawa_data[k * 3 + 0] / 150;
    var y = itokawa_data[k * 3 + 1] / 150;
    var z = itokawa_data[k * 3 + 2] / 150;
    positions[k * 3 + 0] = x;
    positions[k * 3 + 1] = y;
    positions[k * 3 + 2] = z;
        
    colors[k * 4 + 0] = z + 0.5;
    colors[k * 4 + 1] = z + 0.5;
    colors[k * 4 + 2] = z + 0.5;
    colors[k * 4 + 3] = 1.0;
        
    k++;
  }
  geometry.addAttributes(positions, {
    POSITION:{
      size: 3
    }
  });
  geometry.addAttributes(colors, {
    COLOR:{
      size: 4
    }
  });
  //geometry.addIndex("default", new Uint16Array(itokawa_indices), WebGLRenderingContext.LINE_STRIP);
  geometry.addIndex("default", new Uint16Array(itokawa_indices), WebGLRenderingContext.TRIANGLES);
  return geometry;
});

var Vector3 = gr.lib.math.Vector3;
var Quaternion = gr.lib.math.Quaternion;

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    // オイラー角による回転
    //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
    
    // クォータニオンによる回転
    var axis = new Vector3(1, 1, 1);
    var angle = this.phi * Math.PI / 180;
    var q = Quaternion.angleAxis(angle, axis);
    this.node.setAttribute('rotation', q.normalize());
  },
});