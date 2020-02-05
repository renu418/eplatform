#include<bits/stdc++.h>

using namespace std;

typedef struct Node {
    int data;
    Node * next;
    Node (int d) {
        data = d;
        next = NULL;
    }
} Node;

Node * head = NULL, * connect = NULL;

void insertNode(int data) {
    if(!head) {
        head = new Node(data);
        connect = head;
    }else {
        connect->next = new Node(data);
        connect = connect->next;
    }
}

void printList(Node * head) {
    Node * ptr = head;
    while(ptr) {
        cout << ptr->data << ' ';
        ptr = ptr->next;
    }
    cout << endl;
}

int main()
{
    int tt; cin >> tt;
    while(tt--) {
        int N; cin >> N;
        head = connect = NULL;
        for(int i = 0; i < N; i++) {
            int key; cin >> key;
            insertNode(key);
        }
        printList(head);
    }
}