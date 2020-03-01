import numpy as np
from matplotlib import pyplot as plt
from sklearn.decomposition import PCA
from sklearn import preprocessing
import csv

# read data from a CSV file, you can choose different delimiters,
# skip the header, select columns
# it return a numpy array

d=np.genfromtxt('wdbc.csv',skip_header=0,usecols=(0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31),delimiter=',')
#targets = np.array([])


targets=np.genfromtxt('wdbc.csv', skip_header=0, usecols=(1),delimiter=',')

"""
print('\n')
print('\n')
print('D vale: ', d)
print('\n')

"""

target_names = np.array(['Benigno', 'Maligno'])

"""
print('\n')
print('\n')
print('Il Nome e: ', target_names)
print('\n')
"""

#NORMALIZZAZIONE E PCA
#normalize the data with StandardScaler
d_std = preprocessing.StandardScaler().fit_transform(d)

#compute PCA
#with 2 components
pca=PCA(n_components=2)
dpca=pca.fit_transform(d_std)

#with 15 components
pca1=PCA(n_components=15)
dpca1=pca1.fit_transform(d_std)
#dpca = pca.fit(d).transform(d)


#computing the covariance matrix
cov_mat = np.cov(d_std.T)

# eigenvectors and eigenvalues from the covariance matrix
d_val, d_vec = np.linalg.eig(cov_mat)


#eugenvalues' plot
plt.figure()
lw = 2
X = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
d_val.sort()

plt.scatter(d_val, X, alpha=.8, lw=lw)
plt.legend(loc='best', shadow=False, scatterpoints=1)
plt.title('Autovalori di 30 componenti del PCA')
plt.show()
#fine plot Autovalori

"""
print('\n')
print('\n')
print("Variance: ",pca1.explained_variance_ratio_)
print('\n')
print('\n')
"""

#grafico componenti e varianza
plt.figure()
lw = 2
dom = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
d_val.sort()
plt.scatter(dom, pca1.explained_variance_ratio_, alpha=.8, lw=lw)
plt.legend(loc='best', shadow=False, scatterpoints=1)
plt.title('Varianza 15 componenti PCA')
plt.show()
#fine grafico varianza componenti



#GRAFICO CON I CLUSTER FINALI
plt.figure()
colors = ['navy', 'red']
lw = 2

for color, i, target in zip(colors, [0, 1], target_names):
    plt.scatter(dpca[targets == i, 0], dpca[targets == i, 1], color=color, alpha=.8, lw=lw,label=target)
plt.legend(loc='best', shadow=False, scatterpoints=1)
plt.title('Breast cancer dataset')
plt.show()

"""
print('\n')
print('\n')
print("Componenti PCA1: ",dpca1)
print('\n')
print('\n')
"""

np.savetxt("Cancer_components.csv", dpca, delimiter=";", fmt='%1.9f')
#np.savetxt("Variance_of_PCA's_components.csv", pca1.explained_variance_ratio_, delimiter=";")
