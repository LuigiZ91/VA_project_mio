import random
import numpy as np
import sklearn.metrics
from sklearn import datasets
from sklearn.model_selection import train_test_split, cross_val_score, ShuffleSplit, GridSearchCV
from sklearn import svm
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.utils.multiclass import unique_labels
import matplotlib.pyplot as plt

def plot_confusion_matrix(y_true, y_pred, classes,
                          normalize=False,
                          title=None,
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if not title:
        if normalize:
            title = 'Normalized confusion matrix'
        else:
            title = 'Confusion matrix, without normalization'

    # Compute confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    # Only use the labels that appear in the data
    classes = classes[unique_labels(y_true, y_pred)]
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        #print("Normalized confusion matrix")
    else:
        pass
        #print('Confusion matrix, without normalization')

    #print(cm)

    fig, ax = plt.subplots()
    im = ax.imshow(cm, interpolation='nearest', cmap=cmap)
    ax.figure.colorbar(im, ax=ax)
    # We want to show all ticks...
    ax.set(xticks=np.arange(cm.shape[1]),
           yticks=np.arange(cm.shape[0]),
           # ... and label them with the respective list entries
           xticklabels=classes, yticklabels=classes,
           title=title,
           ylabel='True label',
           xlabel='Predicted label')

    ax.set_ylim(len(classes)-0.5, -0.5)

    # Rotate the tick labels and set their alignment.
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right",
             rotation_mode="anchor")

    # Loop over data dimensions and create text annotations.
    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            ax.text(j, i, format(cm[i, j], fmt),
                    ha="center", va="center",
                    color="white" if cm[i, j] > thresh else "black")
    fig.tight_layout()
    return ax


vect = []
flag = 0
found = 0

#columns= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
columns= [2,3,4,5,6,7,8,9,10,11]
print("\n")
print("2 - radius")
print("3 - texture")
print("4 - perimeter")
print("5 - area")
print("6 - smoothness")
print("7 - compactness")
print("8 - concavity")
print("9 - concave points")
print("10 - symmetry")
print("11 - fractal dimension")
print("0 - exit")

while (flag == 0):
    temp = input("Digitare le caratteristica da eliminare: ")
    featureI = int(temp)
    if (featureI == 0):
        flag = 1
        break
    for elem in (columns):
        if (elem == featureI):
            found = 1
    if (found == 1):
        columns.remove(featureI)
        #print("featureI: ",featureI)
        #columns.remove((featureI+10))
        #print("(featureI+10): ",(featureI+10))
        #columns.remove((featureI+20))
        #print("(featureI+20: ",(featureI+20))
        #print("Columns vale: ", columns)
        print("Rimosso ", featureI)
        found = 0
    else:
        print("Feature già rimossa o non presente")
        #print("Vect vale:" ,vect)
#input2 = input("Sono fuori dal while, scrivi qualcosa: ")
#print("Hai scritto: ", input2)

#print("Vect vale:" ,vect)

#print("columns vale:",columns)

d=np.genfromtxt('wdbc.csv',skip_header=0,usecols=columns,delimiter=',')
#print("---------------------------")
#print("D vale:",d)

y=np.genfromtxt('wdbc.csv', skip_header=0, usecols=(1),delimiter=',')
target_names = np.array(['Benigno', 'Maligno'])
class_names = np.array([str(c) for c in target_names])

targets= y.astype(int)


X_all = d
y_all = targets

"""
print('\n')
print('Data: ', X_all)
print('Target: ', y_all)


print('\n')
print(X_all.shape)
print(y_all.shape)
"""
print('\n')
print("Dataset: WDBC")
print("Number of attributes/features: %d" %(X_all.shape[1]))
print("Number of classes: %d %s" %(len(class_names), str(class_names)))
print("Number of samples: %d" %(X_all.shape[0]))
print('\n')

"""
#display a random sample
id = random.randrange(0,X_all.shape[0])
print("x%d = %r" %(id,X_all[id]))
print("y%d = %r ['%s']" %(id,y_all[id],class_names[y_all[id]]))
"""

#split data in training set and test set
X_train, X_test, y_train, y_test = train_test_split(X_all, y_all, test_size=0.333,
                                                    random_state=14)
print("Size of training set: %d" %X_train.shape[0])
print("Size of test set: %d" %X_test.shape[0])
print('\n')

#create a model
#model = svm.SVC(kernel='linear', C=1)
model = GaussianNB()
#model = LogisticRegression()

#fit the model
model.fit(X_train, y_train)

#prediction on test set
y_pred = model.predict(X_test)

#evaluate the model
acc = model.score(X_test, y_test)
print("Accuracy %.3f" %acc)
print(classification_report(y_test, y_pred, labels=None, target_names=class_names, digits=3))

print('Confusion Matrix')
cm = confusion_matrix(y_test, y_pred, labels=None, sample_weight=None)
print(cm)
print('\n')
plot_confusion_matrix(y_test, y_pred, classes=class_names, normalize=False)
