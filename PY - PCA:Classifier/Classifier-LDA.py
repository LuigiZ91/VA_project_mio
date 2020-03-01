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
#

columns= [0,1,2,3,4,5]
#columns= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]

d=np.genfromtxt('Cancer_components2.csv',skip_header=1,usecols=columns,delimiter=';')

y=np.genfromtxt('wdbc.csv', skip_header=0, usecols=(1),delimiter=',')
target_names = np.array(['Benigno', 'Maligno'])
class_names = np.array([str(c) for c in target_names])

targets= y.astype(int)


X_all = d
y_all = targets

print('\n')
print("Dataset: WDBC")
print("Number of attributes/features: %d" %(X_all.shape[1]))
print("Number of classes: %d %s" %(len(class_names), str(class_names)))
print("Number of samples: %d" %(X_all.shape[0]))
print('\n')

#split data in training set and test set
X_train, X_test, y_train, y_test = train_test_split(X_all, y_all, test_size=0.333,
                                                    random_state=14)
print("Size of training set: %d" %X_train.shape[0])
print("Size of test set: %d" %X_test.shape[0])
print('\n')

#create a model
#model = svm.SVC(kernel='linear', C=1)
#model = GaussianNB()
model = LogisticRegression()

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
